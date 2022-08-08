const isLoggedIn = require("../middleware/isLoggedIn");

const router = require("express").Router();
const User = require("../models/User.model")
const Entry = require("../models/Entry.model")

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

router.get("/new-entry", isLoggedIn, (req, res, next) => { 
    res.render("new-entry");
})

/* router.post("/new-entry", isLoggedIn, (req, res, next) => {
    Entry.create({})
}) */


module.exports = router;
