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
  const { date, amount, category, location, description, owner } = req.body;
  const user = req.session.user;
  Entry.create({ date, amount, category, location, description, owner })
    .then((newEntry) => {
      return User.findByIdAndUpdate(owner, {
        $push: { entries: newEntry._id },
      });
    })
    .then(() => console.log(newEntry))
    .then(() => res.redirect(`/dashboard/${user._id}`))
    .catch((err) => console.log('Error while creating an entry: ', err));
});

// router.post('/post-create', (req, res, next) => {
//   const { title, content, author } = req.body;

//   Post.create({ title, content, author })
//     .then((newPost) => {
//       return User.findByIdAndUpdate(author, { $push: { posts: newPost._id } });
//     })
//     .then(() => res.redirect('/posts'))
//     .catch((err) => next(err));
// });

/* 
movieRouter.post('/', (req, res, next) => {
    Movie.create(req.body)
    .then( newMovie => {
      // console.log("New movie: ", newMovie);
  
      // res.redirect ALWAYS has '/' because it is the URL
      res.redirect('/movies')
    } )
    .catch( err => console.log("Error while creating a movie: ", err))
  }) */

router.get('/edit-entry', isLoggedIn, (req, res, next) => {
  res.render('entries/edit-entry');
});

/* router.post("/new-entry", isLoggedIn, (req, res, next) => {
    Entry.create({})
}) */

router.get('/edit-user/:userId', isLoggedIn, (req, res, next) => {});

router.post('/edit-user/:userId', isLoggedIn, (req, res, next) => {});

module.exports = router;
