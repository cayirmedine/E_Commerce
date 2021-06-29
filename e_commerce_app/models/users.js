var moment = require("moment");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Users", {
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

        bdate: {
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
}