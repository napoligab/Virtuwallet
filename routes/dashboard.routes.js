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
  res.render('entries/new-entry');
});

router.post('/', isLoggedIn, (req, res, next) => {
  Entry.create(req.body).then((newEntry) => {
    console.log(newEntry);
    res
      .redirect(`/dashboard/${user._id}`)
      .catch((err) => console.log('Error while creating a movie: ', err));
  });
});
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

module.exports = router;
