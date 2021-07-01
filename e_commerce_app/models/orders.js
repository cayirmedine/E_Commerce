var moment = require("moment");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Orders", {
        // u_id: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: "Users",
        //         key: 'id'
        //     },

        //     allowNull: false
        // },

        // b_id: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: "Basket",
        //         key: 'id'
        //     },

        //     allowNull: false
        // },

        o_date: {
            type: Sequelize.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('bdate')).format('DD/MM/YYYY');
            }
        },

        address: {
            type: Sequelize.INTEGER,
            reference: {
                model: "Address",
                key: "id"
            },

            allowNull: false
        },

        status: {
            type: Sequelize.STRING,
            allowNull: false
        },

        payment_method: {
            type: Sequelize.STRING,
            allowNull: false
        },

        basket_cost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },

        shipping_cost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },

        total_cost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    })
}