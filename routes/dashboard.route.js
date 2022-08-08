const router = require("express").Router();

router.get('/dashboard', isLoggedIn, (req, res, next) => {
    res.render('/dashboard')
})