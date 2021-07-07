module.exports = (sequelize, Sequelize) => {
    var Basket = sequelize.define("Baskets", {
        
    })

    Basket.associate = models => {
        Basket.belongsTo(Users, {foreignKey: "user_id"});
        Basket.hasOne(Order, {foreignKey: "basket_id"});
    }

    return Basket;
}