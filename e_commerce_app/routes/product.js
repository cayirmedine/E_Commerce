var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

const { catModel, subCatModel, productModel } = require('../db');
const uploadS3 = require('../fileUpload');

router.get("/Categories", (req, res, next) => {
  catModel.findAll().then((result) => res.json({data: result}), (err) => res.send("An error occoured"));
});

router.post("/addCategory", uploadS3.single('imgPath'), (req, res, next) => {
  catModel.create({
    title: req.body.title,
    imgPath: req.file.location
  }).then((result) => {res.json({data: result})}, (err) => res.send(err));
  
});

router.get("/subCategories/:cid", (req, res, next) => {
  subCatModel.findAll({
    where: {
      c_id: req.params.cid
    }
  }).then((result) => res.json({data: result}));
});

router.post("/subCategory", (req, res, next) => {
  subCatModel.create(req.body).then((result) => res.json({data: result}), (err) => {res.send(err)});
});

router.get("/products/:scid", (req, res, next) => {
  productModel.findAll({
    where: {
      sc_id: req.params.scid
    }
  }).then((result) => res.json({data: result}));
});

router.get("/product_detail/:id", (req, res, next) => {
  productModel.findOne({
    where: {
      id: req.params.id
    }
  }).then((result) => res.json({data: result}));
})

router.post("/addProduct", uploadS3.single("imgPath"), (req, res, next) => {
  productModel.create({
    c_id: req.body.c_id,
    sc_id: req.body.sc_id,
    title: req.body.title,
    imgPath: req.file.location,
    unitPrice: req.body.unitPrice,
    desc: req.body.desc
  }).then((result) => res.json({data: result}), (err) => {res.send(err)});
})

router.get("/newProducts", (req, res, next) => {
  productModel.findAll({limit: 5, order: [['createdAt', 'DESC']]}).then((result) => res.json({data: result}));
});

module.exports = router;