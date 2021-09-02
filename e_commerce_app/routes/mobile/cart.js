var express = require("express");
var router = express.Router();
const checkAuth = require("../../middlewares/checkAuth");
const cartController = require("../../controllers/cartController");

router.post("/basket/add-product", checkAuth, cartController.addProductCart);

router.get("/basket/:userId", checkAuth, cartController.getBasket);

router.delete(
  "/basket/delete-product/:userId/:productId",
  checkAuth,
  cartController.deleteBasketProduct
);

router.delete("/clear-basket/:userId", checkAuth, cartController.clearBasket);

router.post("/make-order", checkAuth, cartController.makeOrder);

router.put(
  "/update-status/:orderId",
  checkAuth,
  cartController.updateOrderStatus
);

router.get("/order-detail/:orderId", checkAuth, cartController.orderFindOne);

router.get("/orders/:userId", checkAuth, cartController.ordersFindAll);

module.exports = router;
