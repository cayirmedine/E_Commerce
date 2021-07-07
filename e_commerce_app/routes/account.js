var express = require('express');
const { addressModel, usersModel } = require('../db');
var router = express.Router();

//const {checkPhone, checkResult} = require('../validators/checkPhone')

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

router.put("/update-info/:userId", (req, res, next) => {

    usersModel.update(
        {
            fullname: req.body.fullname,
            email: req.body.email, 
            phone: req.body.phone, 
            birthdate: req.body.birthdate, 
            gender: req.body.gender
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