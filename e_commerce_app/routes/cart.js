var express = require('express');
const { basketModel, orderModel } = require('../db');
var router = express.Router();

router.post("/basket/add-product", (req, res, next) => {
    basketModel.create(req.body).then((result) => res.json({data: result}));
})

router.get("/basket/:userId", (req, res, next) => {
    basketModel.findAll({
        where: {
            user_id: req.params.userId
        }
    }).then((result) => res.json({data: result}))
})

router.delete("/basket/delete-product/:userId/:productId", (req, res, next) => {
    basketModel.destroy({
        where: {
            user_id: req.params.userId,
            product_id: req.params.productId
        }
    }).then((deletedCount) => {
        if(deletedCount === 0) {
          res.status(404).send({
              error: "ID which is you search for delete is not found"
          });
        } else {
          res.send(deletedCount+" product(s) deleted"); 
        }
    })
})

router.delete("/clear-basket/:userId", (req, res, next) => {
    basketModel.destroy({
        where: {
            user_id: req.params.userId
        }
    }).then((deletedCount) => {
        if(deletedCount === 0) {
          res.status(404).send({
              error: "ID which is you search for delete is not found"
          });
        } else {
          res.send("Basket cleared"); 
        }
    })
})

router.post("/make-order", (req, res, next) => {
    orderModel.create(req.body).then((result) => res.json({data: result}))
})

router.get("/order-detail/:orderId", (req, res, next) => {
    orderModel.findOne({
        where: {
            id: req.params.orderId
        }
    }).then((result) => res.json({data: result}));
})

router.get("/orders/:userId", (req, res, next) => {
    orderModel.findAll({
        where: {
            user_id: req.params.userId
        }
    }).then((result) => res.json({data: result}))
})

module.exports = router;