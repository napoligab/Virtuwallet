const isLoggedIn = require("../middleware/isLoggedIn");

const router = require("express").Router();

router.get("/dashboard", isLoggedIn, (req, res, next) => {
    res.render("dashboard");
});

router.get("/dashboard/:userId", isLoggedIn, (req, res, next) => {
    res.render("dashboard", {user});
});

router.post("/dashboard/:userId", isLoggedIn, (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;
  const {userId} = req.params;
  
  

    res.render("dashboard", );
});


module.exports = router;

