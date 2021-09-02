var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
dotenv.config();

const checkAuth = require("../../middlewares/checkAuth");
const productController = require("../../controllers/productController");
const productCampaignController = require("../../controllers/productCampaignController");

const uploadS3 = require("../../services/mediaUploadService");

const validate = require("../../validators/products");

router.get("/categories", checkAuth, productController.categoriesFindAll);

// let update = async (req, res, next) => {
//   try {
//     console.log("try-catch update");
//     await uploadS3.single("image");
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Image can not uploaded" });
//     next(error);
//   }
// };

router.post(
  "/categories",
  checkAuth,
  uploadS3.single("image"),
  validate.createCategory,
  productController.createCategory
);

router.get("/category/:catId", checkAuth, productController.categoryFindOne);

router.put(
  "/category/:catId",
  checkAuth,
  uploadS3.single("image"),
  validate.updateCategory,
  productController.updateCategory
);

router.delete(
  "/categories/:catId",
  checkAuth,
  productController.deleteCategory
);

router.get(
  "/sub-categories",
  checkAuth,
  productController.subCategoriesFindAll
);

router.post("/sub-categories", checkAuth, validate.createSubCat, productController.createSubCategory);

router.get(
  "/sub-categories/:subCatId",
  checkAuth,
  productController.subCategoryFindOne
);

router.get(
  "/sub-categories-cat/:catId",
  checkAuth,
  productController.categorySubCategoriesFindAll
);

router.put(
  "/sub-categories/:subCatId",
  checkAuth,
  validate.updateSubCat,
  productController.updateSubCategory
);

router.delete(
  "/sub-categories/:subCatId",
  checkAuth,
  productController.deleteSubCategory
);

router.get("/products", checkAuth, productController.productFindAll);

router.get(
  "/campaign-product/:campaignId",
  checkAuth,
  productCampaignController.campaignProductFindAll
);

router.post(
  "/products",
  checkAuth,
  uploadS3.array("images", 5),
  validate.createProduct,
  productController.createProduct
);

router.get("/products/:productId", checkAuth, productController.productFindOne);

router.put(
  "/products/:productId",
  checkAuth,
  uploadS3.array("images", 5),
  validate.updateProduct,
  productController.updateProduct
);

router.delete(
  "/products/:productId",
  checkAuth,
  productController.deleteProduct
);

router.get("/campaigns", checkAuth, productCampaignController.campaignsFindAll);

router.post(
  "/campaigns",
  checkAuth,
  uploadS3.single("image"),
  validate.createCampaign,
  productCampaignController.createCampaign
);

router.get(
  "/campaigns/:campaignId",
  checkAuth,
  productCampaignController.campaignFindOne
);

router.put(
  "/campaigns/:campaignId",
  checkAuth,
  uploadS3.single("image"),
  validate.updateCampaign,
  productCampaignController.updateCampaign
);

router.delete(
  "/campaigns/:campaignId",
  checkAuth,
  productCampaignController.deleteCampaign
);

module.exports = router;
