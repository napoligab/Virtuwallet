const isLoggedIn = require("../middleware/isLoggedIn");

const router = require("express").Router();
const User = require("../models/User.model")
const Entry = require("../models/Entry.model")

/* router.get("/dashboard", isLoggedIn, (req, res, next) => {
    const user = req.session.user
    res.render("dashboard", {user});
}); */

router.get("/dashboard/:userId", isLoggedIn, (req, res, next) => {
    const {userId} = req.params;

    User.findById(userId)
    .populate("entries")
    .then((user) => {
        console.log(user)
        res.render("dashboard", user);
    })
    .catch(err=> next(err))
});


module.exports = router;

