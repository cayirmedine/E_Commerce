var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
dotenv.config();

const checkAuth = require("../../middlewares/checkAuth");
const productController = require("../../controllers/productController");

router.get("/categories", checkAuth, productController.categoriesFindAll);

router.get(
  "/sub-categories/:catId",
  checkAuth,
  productController.categorySubCategoriesFindAll
);

router.get("/products-cat/:catId", checkAuth, productController.categorysProductsFindAll);

router.get("/products-subcat/:subCatId", checkAuth, productController.subCategoryProductFindAll);

router.get("/product-detail/:productId", checkAuth, productController.productFindOne);

router.get("/new-products", checkAuth, productController.newProducts);

module.exports = router;
