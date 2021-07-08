var express = require('express');
const { sliderModel, imageModel, favModel, productModel } = require('../db');
const uploadS3 = require('../fileUpload');
var router = express.Router();

router.post("/add-slider",uploadS3.single('image'), async (req,res,next) => {
  await sliderModel.create({
    title: req.body.title
  }).then(async (result) => {
    await imageModel.create({
      uri: req.file.location,
      slider_id: result.id
    })
    res.send({data: result});
  })
}) 

router.get("/sliders", (req,res,next) => {
  sliderModel.findAll({
    include: [ { model: imageModel, attributes: ['id','uri']}]
  }).then((result) => {
    res.json({ data: result })
  })
})

router.post("/add-fav", (req, res, next) => {
  favModel.create({
    user_id: req.body.user_id,
    product_id: req.body.product_id
  }).then((result) => {
    res.json({data: result})
  })
})

router.get("/favs/:userId", (req, res, next) => {
  favModel.findAll({
    where: {
      user_id: req.params.userId
    }
  }).then((result) => {
    res.json({data: result})
  })
})

router.delete("/delete-fav/:favId", (req, res, next) => {
  favModel.destroy({
    where: {
        id: req.params.favId
    }
  }).then((deletedCount) => {
    if(deletedCount === 0) {
      res.status(404).send({
          error: "ID which is you search for delete is not found"
      });
    } else {
      res.send(deletedCount+" favorite(s) deleted"); 
    }
  })
})

module.exports = router;