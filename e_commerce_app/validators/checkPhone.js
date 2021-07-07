const {check, validationResult} = require("express-validator");

const checkPhone = [
    check('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please enter a valid phone number')
]

const checkResult = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: error.array()
            //   errors: 'error',
            //   data: error
        });
    }

    next();
}

module.exports = {
    checkPhone,
    checkResult
}