var express = require("express");
var router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");
const userController = require("../../controllers/userController");
const validate = require("../../validators/auth");

// router.post("/sign-up", validate.signUp, userController.signUp);

// router.post("/sign-in", userController.signIn);

router.post("/add-address",  validate.addAddress, userController.createAddress);

router.get("/cities/:cityId",  userController.findCity);

router.get("/addresses/:userId",  userController.userAddresses);

router.put("/password/:userId",  userController.userChangePassword);

router.put("/update-info/:userId",  validate.updateUser, userController.userUpdateInfo);

module.exports = router;
