var moment = require("moment");
module.exports = (sequelize, Sequelize) => {
    var Order = sequelize.define("Orders", {
        
        orderdate: {
            type: Sequelize.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('orderdate')).format('DD/MM/YYYY');
            }
        },

        orderStatus: {
            type: Sequelize.STRING
        },

        paymentMethod: {
            type: Sequelize.STRING,
            allowNull: false
        },

        basketCost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },

        shippingCost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },

        totalCost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    })

    Order.associate = models => {
        Order.belongsTo(Users, {foreignKey: "user_id"});
    }

    return Order;
}