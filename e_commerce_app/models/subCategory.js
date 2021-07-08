module.exports = (sequelize, Sequelize) => {
    var ProductSubCat = sequelize.define("SubCategories", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    // ProductSubCat.associate = models => {
    //     ProductSubCat.belongsTo(models.ProductCat);
    // }

    return ProductSubCat;
}