module.exports = (sequelize, Sequelize) => {
    var ProductSubCat = sequelize.define("SubCategories", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    ProductSubCat.associate = models => {
        ProductSubCat.belongsTo(ProductCat, {foreignKey: "cat_id"});
    }

    return ProductSubCat;
}