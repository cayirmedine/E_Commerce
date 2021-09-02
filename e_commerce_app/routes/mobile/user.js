var express = require("express");
var router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");
const userController = require("../../controllers/userController");
const validate = require("../../validators/auth");

router.post("/sign-up", validate.signUp, userController.signUp);

router.post("/sign-in", userController.signIn);

router.post("/add-address", checkAuth, userController.createAddress);

router.get("/addresses/:userId", checkAuth, userController.userAddresses);

router.put("/password/:userId", checkAuth, userController.userChangePassword);

router.put("/update-info/:userId", checkAuth, validate.updateUser, userController.userUpdateInfo);

module.exports = router;
