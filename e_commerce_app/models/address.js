module.exports = (sequelize, Sequelize) => {
   return sequelize.define("Addresses", {

        u_id: {
            type: Sequelize.INTEGER,

            references: {
                model: "Users",
                key: "id"
            },

            allowNull: false
        },

        add_type: {
            type: Sequelize.STRING,
            allowNull: false
        }, //Delivery or bill address

        add_title: {
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

        district: {
            type: Sequelize.STRING,
            allowNull: false
        },

        neighbourhood: {
            type: Sequelize.STRING,
            allowNull: false
        },

        detail: {
            type: Sequelize.STRING,
            allowNull: false
        },

        zip_code: {
            type: Sequelize.STRING,
        },

        phone: {
            type: Sequelize.STRING
        },

        note: {
            type: Sequelize.STRING
        }
    });
}