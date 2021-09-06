const { basketModel, productModel, orderModel } = require("../database/db");
const modelService = require("../services/modelService");
const { paginate } = require("../services/paginate");

module.exports = {
  //POST /cart/basket/add-product
  addProductCart: async (req, res, next) => {
    try {
      const cartProduct = await modelService.create(basketModel, req.body);

      res.json({ status: "Success", data: cartProduct });
    } catch (error) {
      error.message = "Add product to cart is not successful: " + error;
      next(error);
    }
  },

  //GET /cart/basket/:userId
  getBasket: async (req, res, next) => {
    const { userId } = req.params;

    let options = {
      where: {
        user_id: userId,
      },
      // include: [{
      //     model: productModel,
      //     attributes: ["id","title"]
      // }]
    };

    try {
      const basket = await modelService.findAll(basketModel, options);

      res.json({ status: "Success", data: basket });
    } catch (error) {
      error.message = "Get basket is not successful: " + error;
      next(error);
    }
  },

  //DELETE /cart/basket/delete-product/:userId/:productId
  deleteBasketProduct: async (req, res, next) => {
    const { userId, productId } = req.params;

    options = {
      where: {
        user_id: userId,
        product_id: productId,
      },
    };

    try {
      const deletedBasketProduct = await modelService.delete(
        basketModel,
        options
      );

      res.json({ status: "Success", data: deletedBasketProduct });
    } catch (error) {
      error.message = "Remove product from basket is not successful: " + error;
      next(error);
    }
  },

  //DELETE /cart/clear-basket/:userId
  clearBasket: async (req, res, next) => {
    const { userId } = req.params;

    let option = {
      where: {
        user_id: userId,
      },
    };

    try {
      const clearedBasket = await modelService.delete(basketModel, option);

      res.json({ status: "Success", data: clearedBasket });
    } catch (error) {
      error.message = "Basket is can not cleared: " + error;
      next(error);
    }
  },

  //POST /cart/make-order
  makeOrder: async (req, res, next) => {
    let orderStatus = "Your order has reached the seller";

    try {
      const order = await modelService.create(orderModel, {
        orderStatus,
        ...req.body,
      });

      res.json({ status: "Success", data: order });
    } catch (error) {
      error.message = "Making order is not successful: " + error;
      next(error);
    }
  },

  //PUT /cart/update-status/:orderId
  updateOrderStatus: async (req, res, next) => {
    const { orderStatus } = req.body;
    const { orderId } = req.params;

    let attributes = {};
    attributes.orderStatus = orderStatus;

    let condition = {
      where: {
        id: orderId,
      },
    };

    try {
      const orderStatus = await modelService.update(
        orderModel,
        attributes,
        condition
      );
      res.json({ status: "Success", data: orderStatus });
    } catch (error) {
      error.message = "Update order status is not successful: " + error;
      next(error);
    }
  },

  //GET /cart/order-detail/:orderId
  orderFindOne: async (req, res, next) => {
    const { orderId } = req.params;

    let option = {
      where: {
        id: orderId,
      },
    };

    try {
      const order = await modelService.findOne(orderModel, option);

      res.json({ status: "Success", data: order });
    } catch (error) {
      error.message = "Get order details is not successful: " + error;
      next(error);
    }
  },

  //GET /cart/orders/:userId
  ordersFindAll: async (req, res, next) => {
    const { userId } = req.params;
    let page = req.query.page;
    let option = {
      where: {
        user_id: userId,
      },
    };

    try {
      const orders = await paginate(orderModel, option, page);

      res.json({ status: "Success", data: orders });
    } catch (error) {
      error.message = "Get user's orders is not successful: " + error;
      next(error);
    }
  },
};
