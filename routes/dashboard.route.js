const router = require("express").Router();

router.get('/dashboard', (req, res, next) => {
    res.render('/routes.dashboard')
})