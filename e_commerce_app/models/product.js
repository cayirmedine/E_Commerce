module.exports = (sequelize, Sequelize) => {
    var Product = sequelize.define("Products", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        unitPrice: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },

        desc: {
            type: Sequelize.STRING,
        }
    })

    Product.associate = models => {
        Product.belongsTo(ProductSubCat, {foreignKey: "subCat_id"});
        Product.belongsTo(ProductCat, {foreignKey: "cat_id"});
        Product.hasMany(Basket, {foreignKey: "product_id"});
        Product.hasMany(Fav, {foreignKey: "product_id"});
        Product.hasMany(Image, {foreignKey: "product_id"});
    }

    return Product;
}