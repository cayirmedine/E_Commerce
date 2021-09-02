module.exports = (sequelize, Sequelize) => {
    var Basket = sequelize.define("Baskets", {
        
    })

    // Basket.associate = models => {
    //     Basket.belongsTo(models.Users);
    //     Basket.hasOne(models.Order);
    // }

    return Basket;
}