var express = require('express');
const { addressModel, usersModel } = require('../db');
var router = express.Router();

router.post("/add-address", (req, res, next) => {
  addressModel.create(req.body).then((result) => res.json({data: result}), (err) => res.send("An error occoured: " +err));
})

router.get("/addresses/:userId", (req, res, next) => {
    addressModel.findAll({
        where: {
            user_id: req.params.userId
        },
        //include: [{model: usersModel}]
    }).then((result) => res.json({data: result}), (err) => res.send("An error occoured: " +err));
})

router.put("/password/:userId", (req, res, next) => {

    usersModel.update(
        {
            password: req.body.password
        },
        {
            where: {id: req.params.userId},
            returning: true
        }
    ).then(([rowsUpdate, updatedUsers]) => {
        res.json({data: rowsUpdate, updatedUsers});
    })
    
})

module.exports = router;