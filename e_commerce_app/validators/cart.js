const validator = require("./validate");

module.exports = {
  productUserRelation: (req, res, next) => {
    const validationRule = {
      user_id: "required|integer",
      product_id: "required|integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  makeOrder: (req, res, next) => {
    const validationRule = {
      orderStatus: "string",
      paymentMethod: "required|string",
      basketCost: "required|numeric",
      shippingCost: "required|numeric",
      totalCost: "required|numeric",
      address_id: "required|integer",
      user_id: "required|integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
        if (!status) {
          res.status(422).send({ status: "Error", data: error });
        } else {
          next();
        }
      });
  },
};
