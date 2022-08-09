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

router.get('/edit-entry/:entryId', isLoggedIn, (req, res, next) => {
 const {entryId} = req.params;
 const user = req.session.user;
 Entry.findById(entryId)
   .then((entry) => {
    console.log(entry);
    res.render('entries/edit-entry', entry)
   })
   .catch((err) => console.log(err));
});

router.post('/edit-entry/:entryId', isLoggedIn, (req, res, next) => {
  const { entryId } = req.params;
  const { date, amount, category, location, type } = req.body;
  const user = req.session.user;

  Entry.findByIdAndUpdate(entryId, { date, amount, category, location, type }, {new: true})
    .then(() => res.redirect(`/dashboard/${user._id}`))
    .catch((err) => console.log(err));
}); 

  router.get('/edit-user/:userId', isLoggedIn, (req, res, next) => {
        const {userId} = req.params;
        const user = req.session.user;
        User.findById(userId)
          .then((user) => {
            console.log(user);
            res.render('users/edit-user', user)
          })
          .catch((err) => console.log(err));
       });


router.post('/edit-user/:userId', isLoggedIn, (req, res, next) => {

    const {userId} = req. params;
    const { email, firstName, lastName, password, entries,  } = req.body;
    const user = req.session.user;
   
    Entry.findByIdAndUpdate(userId, {email, firstName, lastName, password, entries})
   .populate('entries')
   .then(() => res.redirect(`/dashboard/${user._id}`))
   .catch((err) => next(err));
 }); 

module.exports = router;
