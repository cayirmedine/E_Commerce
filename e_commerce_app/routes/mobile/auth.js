var express = require("express");
var router = express.Router();
var passport = require('passport');

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

const userController = require("../../controllers/userController");
const validate = require("../../validators/auth");

router.post("/sign-up", validate.signUp, userController.signUp);

router.post("/sign-in", userController.signIn);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/google/success", isLoggedIn, (req, res, next) => {
  res.send("Successful");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/success",
    failureRedirect: "/",
  })
);

router.get("/facebook/success", isLoggedIn, (req, res, next) => {
  res.send("Successful");
})

module.exports = router;
