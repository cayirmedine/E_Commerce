var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

const { productCatModel, productSubCatModel, productModel, subCatsCat, productSubCat, productCat, imageModel, imageSubCat } = require('../db');
const uploadS3 = require('../fileUpload');

router.get("/", (req,res,next) => {
  res.send("Test");
})

router.get("/categories", (req, res, next) => {
  productCatModel.findAll({
    include: [ { model: imageModel, attributes: ['id','uri']}]
  }).then((result) => {
    res.json({ data: result })
  })
});

router.post("/add-category", uploadS3.single('image'), async (req, res, next) => {
  await productCatModel.create({
    title: req.body.title
  }).then(async (result) => {
    await imageModel.create({
      uri: req.file.location,
      cat_id: result.id
    })
    res.send({data: result});
  })
});

router.get("/sub-categories/:catId", (req, res, next) => {
  productSubCatModel.findAll({
    where: {
      cat_id: req.params.catId
    },
    include: [{model: productCatModel}]
  }).then((result) => res.json({data: result}));
});

router.post("/sub-category", (req, res, next) => {
  productSubCatModel.create(req.body, {include: [{model: productCatModel}]}).then((result) => res.json({data: result}), (err) => {res.send(err)});
});

router.get("/products-cat/:catId", (req, res, next) => {
  productModel.findAll({
    where: {
      cat_id: req.params.catId
    },
    include: [{model: imageModel, attributes: ['id','uri']}]
  }).then((result) => res.json({data: result}));
});

router.get("/products-subcat/:subCatId", (req, res, next) => {
  productModel.findAll({
    where: {
      subCat_id: req.params.subCatId
    },
    include: [{model: imageModel, attributes: ['id','uri']}]
  }).then((result) => res.json({data: result}));
});

router.get("/product-detail/:id", (req, res, next) => {
  productModel.findOne({
    where: {
      id: req.params.id
    },
    include: [ { model: imageModel, attributes: ['id','uri']}]
  }).then((result) => res.json({data: result})
  );
})

router.post("/add-product", uploadS3.array("images",5), (req, res, next) => {
  productModel.create({
    cat_id: req.body.cat_id,
    subCat_id: req.body.subCat_id,
    title: req.body.title,
    unitPrice: req.body.unitPrice,
    desc: req.body.desc
  }).then(async (result) => {
    req.files.forEach((img) => {
      imageModel.create({
        uri: img.location,
        product_id: result.id
      })
    })
    res.json({data: result})
  }, (err) => res.send("An error occoured: "+err)) 
})

router.get("/new-products", (req, res, next) => {
  productModel.findAll({limit: 5, order: [['createdAt', 'DESC']]}).then((result) => res.json({data: result}));
});

module.exports = router;