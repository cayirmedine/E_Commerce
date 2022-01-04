var express = require("express");
var router = express.Router();
const checkAuth = require("../../middlewares/checkAuth");
const cartController = require("../../controllers/cartController");
const validate = require("../../validators/cart");

router.post("/basket/add-product", validate.productUserRelation, cartController.addProductCart);

router.get("/basket/:userId",  cartController.getBasket);

router.delete(
  "/basket/delete-product/:userId/:productId",
  
  cartController.deleteBasketProduct
);

router.delete("/clear-basket/:userId",  cartController.clearBasket);

router.post("/make-order",  validate.makeOrder, cartController.makeOrder);

router.put(
  "/update-status/:orderId",
  
  cartController.updateOrderStatus
);

router.get("/order-detail/:orderId",  cartController.orderFindOne);

router.get("/orders/:userId",  cartController.ordersFindAll);

module.exports = router;
