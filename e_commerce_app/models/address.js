module.exports = (sequelize, Sequelize) => {
   return sequelize.define("Addresses", {

        addressType: {
            type: Sequelize.STRING,
            allowNull: false
        }, //Delivery or bill address

        addressTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },

        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        city: {
            type: Sequelize.STRING,
            allowNull: false
        },

        town: {
            type: Sequelize.STRING,
            allowNull: false
        },

        neighbourhood: {
            type: Sequelize.STRING,
            allowNull: false
        },

        addressDetail: {
            type: Sequelize.STRING,
            allowNull: false
        },

        zipCode: {
            type: Sequelize.STRING,
        },

        phone: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}