var moment = require("moment");
const orders = require("./orders");

module.exports = (sequelize, Sequelize) => {
    
    var Users = sequelize.define("Users", {
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        birthdate: {
            type: Sequelize.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('bdate')).format('DD/MM/YYYY');
            }
        },

        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Users;
}