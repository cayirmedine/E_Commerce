const { usersModel } = require("../database/db");

module.exports = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if(token != null) {
        usersModel.findOne({
            where: {
                access_token: token
            }
        }).then((result) => {
            if(result != null) {
                req.body.userData = result.toJSON()
                next();
            } else {
                return res.status(401).send({
                    message: 'UnAuthenticated'
                });
            }
        })
    } else {
        return res.status(401).send({
            message: 'UnAuthenticated'
        });
    }
}