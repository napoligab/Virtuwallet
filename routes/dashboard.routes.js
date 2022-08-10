const isLoggedIn = require('../middleware/isLoggedIn');
const router = require('express').Router();
const User = require('../models/User.model');
const Entry = require('../models/Entry.model');
const fileUploader = require('../config/cloudinary.config');

router.get('/dashboard/:userId/filter', isLoggedIn, (req, res, next) => {
  const { userId } = req.params;
  const { startDate, endDate, category } = req.query;

  console.log(new Date(startDate));
  User.findById(userId)
    .populate('entries')
    .then((user) => {
      const filteredEntries = user.entries.filter((el) => {
        //without dates

        if (!startDate && !endDate) {
          if (category === 'all') {
            return el;
          } else {
            return el.category === category;
          }
        } else {
          //with dates
          if (category === 'all') {
            return (
              el.date <= new Date(endDate) && el.date >= new Date(startDate)
            );
          } else {
            return (
              el.date <= new Date(endDate) &&
              el.date >= new Date(startDate) &&
              el.category === category
            );
          }
        }
      });

      const budget = filteredEntries.reduce((a, b) => {
        return a + b.amount;
      }, 0);

      const income = filteredEntries.map((el) => {
        if (el.type === 'income') return el;
      });

      const expense = filteredEntries.map((el) => {
        if (el.type === 'expense') return el;
      });

      let entries = filteredEntries;

      const data = {
        user,
        budget,
        income,
        expense,
        entries,
      };

      console.log(filteredEntries);
      res.render('dashboard', { data });
    })
    .catch((err) => next(err));
});

router.get('/dashboard/:userId', isLoggedIn, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate('entries')
    .then((user) => {
      const budget = user.entries.reduce((a, b) => {
        return a + b.amount;
      }, 0);

      const income = user.entries.map((el) => {
        if (el.type === 'income') return el;
      });

      const expense = user.entries.map((el) => {
        if (el.type === 'expense') return el;
      });

      let entries = user.entries;

      const data = {
        user,
        budget,
        income,
        expense,
        entries,
      };

      console.log(user);
      res.render('dashboard', { data });
    })
    .catch((err) => next(err));
});

router.get('/new-entry', isLoggedIn, (req, res, next) => {
  const user = req.session.user;
  res.render('entries/new-entry', { user });
});

router.post('/new-entry', isLoggedIn, (req, res, next) => {
  const { date, amount, category, location, type } = req.body;
  const user = req.session.user;

  if (type === 'income') {
    Entry.create({ date, amount, category, location, type })
      .then((newEntry) => {
        return User.findByIdAndUpdate(
          user._id,
          {
            $push: { entries: newEntry._id },
          },
          { new: true }
        );
      })
      .then((user) => {
        res.redirect(`/dashboard/${user._id}`);
      })
      .catch((err) => console.log('Error while creating an entry: ', err));
  }
  if (type === 'expense') {
    Entry.create({ date, amount: amount * -1, category, location, type })
      .then((newEntry) => {
        return User.findByIdAndUpdate(
          user._id,
          {
            $push: { entries: newEntry._id },
          },
          { new: true }
        );
      })
      .then((user) => {
        res.redirect(`/dashboard/${user._id}`);
      })
      .catch((err) => console.log('Error while creating an entry: ', err));
  }
});

router.get('/edit-entry/:entryId', isLoggedIn, (req, res, next) => {
  const { entryId } = req.params;
  const user = req.session.user;
  Entry.findById(entryId)
    .then((entry) => {
      console.log(entry);
      res.render('entries/edit-entry', entry);
    })
    .catch((err) => console.log(err));
});

router.post('/edit-entry/:entryId', isLoggedIn, (req, res, next) => {
  const { entryId } = req.params;
  const { date, amount, category, location, type } = req.body;
  const user = req.session.user;

  let amountToUpdate = Math.abs(amount);
  if (type === 'expense') {
    amountToUpdate *= -1;
  }
  Entry.findByIdAndUpdate(
    entryId,
    { date, amount: amountToUpdate, category, location, type },
    { new: true }
  )
    .then(() => res.redirect(`/dashboard/${user._id}`))
    .catch((err) => console.log(err));
});

router.get('/delete-entry/:entryId', isLoggedIn, (req, res, next) => {
  const { entryId } = req.params;
  const user = req.session.user;
  Entry.findByIdAndDelete(entryId)
    .then(() => res.redirect(`/dashboard/${user._id}`))
    .catch((err) => console.log(err));
});

router.get('/edit-user/:userId', isLoggedIn, (req, res, next) => {
  const { userId } = req.params;
  const user = req.session.user;
  User.findById(userId)
    .then((userObj) => {
      console.log(user);
      res.render('users/edit-user', userObj);
    })
    .catch((err) => console.log(err));
});

router.post(
  '/edit-user/:userId',
  isLoggedIn,
  fileUploader.single('profilePic'),
  (req, res, next) => {
    const { userId } = req.params;
    const { email, firstName, lastName, existingImage } = req.body;
    const user = req.session.user;

    let profilePic;
    if (!req.file) {
      profilePic = profilePic;
    } else {
      profilePic = req.file.path;
    }

    User.findByIdAndUpdate(
      userId,
      { email, firstName, lastName, profilePic },
      { new: true }
    )
      .then(() => res.redirect(`/dashboard/${user._id}`))
      .catch((err) => next(err));
  }
);

module.exports = router;
