const validator = require("./validate");

module.exports = {
    signUp: (req, res, next) => {
        const validationRule = {
            "fullName": "required|string",
            "email":"required|email",
            "password":"required|string|min:6",
            "phone":["required","string","regex:/^[0-9]{10}$/"],
            "birthdate":"required|date",
            "gender":"required|string"
        }

        validator(req.body, validationRule, {}, (error, status) => {
            if(!status) {
                res.status(422).send({ status:"Error", data: error});
            } else {
                next();
            }
        })
    },

    updateUser: (req, res, next) => {
        const validationRule = {
            "fullName": "string",
            "email":"email",
            "password":"string|min:6",
            "phone":["string","regex:/^[0-9]{10}$/"],
            "birthdate":"date",
            "gender":"string"
        }

        validator(req.body, validationRule, {}, (error, status) => {
            if(!status) {
                res.status(422).send({ status:"Error", data: error});
            } else {
                next();
            }
        })
    }
}