var express = require("express");
var router = express.Router();
// var passport = require('passport');

// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// };

const userController = require("../../controllers/userController");
const validate = require("../../validators/auth");

router.post("/sign-up", validate.signUp, userController.signUp);

router.post("/sign-in", userController.signIn);

router.post("/google-signin", userController.signInGoogle);

router.post("/facebook-signin", userController.signInFacebook);

module.exports = router;
