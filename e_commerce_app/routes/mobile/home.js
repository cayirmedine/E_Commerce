var express = require("express");
// const uploadS3 = require("../../services/mediaUploadService");
var router = express.Router();

const checkAuth = require("../../middlewares/checkAuth");
const homeController = require("../../controllers/homeController");
const productCampaignController = require("../../controllers/productCampaignController");
const validate = require("../../validators/cart");

// router.post(
//   "/add-slider",
//   checkAuth,
//   uploadS3.single("image"),
//   homeController.createSlider
// );

router.get("/sliders",  homeController.slidersFindAll);

router.post("/add-fav",  validate.productUserRelation, homeController.createFav);

router.get("/favs/:userId",  homeController.usersFavsFindAll);

router.delete("/delete-fav/:favId",  homeController.deleteFav);

router.get("/campaigns",  productCampaignController.campaignsFindAllMobile);

router.get(
  "/campaign-detail/:campaignId",
  
  productCampaignController.campaignFindOne
);

module.exports = router;
