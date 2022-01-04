var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
dotenv.config();

const checkAuth = require("../../middlewares/checkAuth");
const productController = require("../../controllers/productController");
const productCampaignController = require("../../controllers/productCampaignController");

const uploadS3 = require("../../services/mediaUploadService");

const validate = require("../../validators/products");

router.get("/categories",  productController.categoriesFindAll);

router.post(
  "/categories",
  
  uploadS3.single("image"),
  validate.createCategory,
  productController.createCategory
);

router.get("/category/:catId",  productController.categoryFindOne);

router.put(
  "/category/:catId",
  
  uploadS3.single("image"),
  validate.updateCategory,
  productController.updateCategory
);

router.delete(
  "/categories/:catId",
  
  productController.deleteCategory
);

router.get(
  "/sub-categories",
  
  productController.subCategoriesFindAll
);

router.post("/sub-categories",  validate.createSubCat, productController.createSubCategory);

router.get(
  "/sub-categories/:subCatId",
  
  productController.subCategoryFindOne
);

router.get(
  "/sub-categories-cat/:catId",
  
  productController.categorySubCategoriesFindAll
);

router.put(
  "/sub-categories/:subCatId",
  
  validate.updateSubCat,
  productController.updateSubCategory
);

router.delete(
  "/sub-categories/:subCatId",
  
  productController.deleteSubCategory
);

router.get("/products",  productController.productFindAll);

router.get(
  "/campaign-product/:campaignId",
  
  productCampaignController.campaignProductFindAll
);

router.post(
  "/products",
  
  uploadS3.array("images", 5),
  validate.createProduct,
  productController.createProduct
);

router.get("/products/:productId",  productController.productFindOne);

router.put(
  "/products/:productId",
  
  uploadS3.array("images", 5),
  validate.updateProduct,
  productController.updateProduct
);

router.delete(
  "/products/:productId",
  
  productController.deleteProduct
);

router.get("/campaigns",  productCampaignController.campaignsFindAll);

router.post(
  "/campaigns",
  
  uploadS3.single("image"),
  validate.createCampaign,
  productCampaignController.createCampaign
);

router.get(
  "/campaigns/:campaignId",
  
  productCampaignController.campaignFindOne
);

router.put(
  "/campaigns/:campaignId",
  
  uploadS3.single("image"),
  validate.updateCampaign,
  productCampaignController.updateCampaign
);

router.delete(
  "/campaigns/:campaignId",
  
  productCampaignController.deleteCampaign
);

module.exports = router;
