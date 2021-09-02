var express = require("express");
const uploadS3 = require("../../services/mediaUploadService");
var router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");
const homeController = require("../../controllers/homeController");
const productCampaignController = require("../../controllers/productCampaignController");

router.post(
  "/add-slider",
  checkAuth,
  uploadS3.single("image"),
  homeController.createSlider
);

router.get("/sliders", checkAuth, homeController.slidersFindAll);

router.post("/add-fav", checkAuth, homeController.createFav);

router.get("/favs/:userId", checkAuth, homeController.usersFavsFindAll);

router.delete("/delete-fav/:favId", checkAuth, homeController.deleteFav);

router.get("/campaigns", checkAuth, productCampaignController.campaignsFindAllMobile);

router.get(
  "/campaign-detail/:campaignId",
  checkAuth,
  productCampaignController.campaignFindOne
);

module.exports = router;
