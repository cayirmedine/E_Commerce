var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
dotenv.config();

const checkAuth = require("../../middlewares/checkAuth");
const productController = require("../../controllers/productController");

router.get("/categories",  productController.categoriesFindAll);

router.get(
  "/sub-categories/:catId",
  
  productController.categorySubCategoriesFindAll
);

router.get("/products-cat/:catId",  productController.categorysProductsFindAll);

router.get("/products-subcat/:subCatId",  productController.subCategoryProductFindAll);

router.get("/product-detail/:productId",  productController.productFindOne);

router.get("/new-products",  productController.newProducts);

module.exports = router;
