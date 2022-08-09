const isLoggedIn = require('../middleware/isLoggedIn');

const router = require('express').Router();
const User = require('../models/User.model');
const Entry = require('../models/Entry.model');

router.get('/dashboard/:userId', isLoggedIn, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate('entries')
    .then((user) => {
      console.log(user);
      res.render('dashboard', user);
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
});

router.get('/edit-entry', isLoggedIn, (req, res, next) => {
  res.render('entries/edit-entry');
});

router.get('/edit-user/:userId', isLoggedIn, (req, res, next) => {});

router.post('/edit-user/:userId', isLoggedIn, (req, res, next) => {});

module.exports = router;
