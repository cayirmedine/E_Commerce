var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

const { productCatModel, productSubCatModel, productModel } = require('../db');
const uploadS3 = require('../fileUpload');

router.get("/Categories", (req, res, next) => {
  productCatModel.findAll().then((result) => res.json({data: result}), (err) => res.send("An error occoured"));
});

router.post("/addCategory", uploadS3.single('imgPath'), (req, res, next) => {
  productCatModel.create({
    title: req.body.title,
    imgPath: req.file.location
  }).then((result) => {res.json({data: result})}, (err) => res.send(err));
});

router.get("/subCategories/:catId", (req, res, next) => {
  productSubCatModel.findAll({
    where: {
      cat_id: req.params.catId
    }
  }).then((result) => res.json({data: result}));
});

router.post("/subCategory", (req, res, next) => {
  productSubCatModel.create(req.body).then((result) => res.json({data: result}), (err) => {res.send(err)});
});

router.get("/products/:subCatId", (req, res, next) => {
  productModel.findAll({
    where: {
      subCat_id: req.params.subCatId
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
    cat_id: req.body.cat_id,
    subCat_id: req.body.subCat_id,
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