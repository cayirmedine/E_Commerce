var express = require('express');
const { sliderModel, imageModel, favModel, campaignModel, productModel} = require('../db');
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
  }, () => {
    res.send("Invalid file type, only JPEG and PNG is allowed!")
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
  favModel.create(req.body).then((result) => {
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

router.post("/add-campaign", uploadS3.single('image'), async (req, res, next) => {
  await campaignModel.create({
    title: req.body.title,
    description: req.body.description,
    endDate: req.body.endDate,
    isActive: req.body.isActive,
    isInSlider: req.body.isInSlider,
    product_id: req.body.product_id
  }).then(async (result) => {
    await imageModel.create({
      uri: req.file.location,
      campaign_id: result.id
    })
    res.send({data: result});
  }, (err) => {
    res.send(err)
  })
})

router.get("/campaigns", (req, res, next) => {
  campaignModel.findAll({
    include: [{model: imageModel, attributes: ['id','uri']}]
  }).then((result) => {
    res.json({data: result});
  }, (err) => {res.send("An error occoured: " +err)})
})

module.exports = router;