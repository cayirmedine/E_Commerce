module.exports = (sequelize, Sequelize) => {
    var ProductCat =  sequelize.define("Categories", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    ProductCat.associate = models => {
        ProductCat.hasOne(Image, {foreignKey: "cat_id"});
    } 

    return ProductCat;
}