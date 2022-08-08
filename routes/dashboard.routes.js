const router = require("express").Router();

router.get("/dashboard", (req, res, next) => {
    res.render("dashboard");
});

module.exports = router;

