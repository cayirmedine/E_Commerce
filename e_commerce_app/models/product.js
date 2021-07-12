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

        description: {
            type: Sequelize.STRING,
        }
    })

    // Product.associate = models => {
    //     Product.belongsTo(models.ProductSubCat);
    //     Product.belongsTo(models.ProductCat);
    //     Product.hasMany(models.Basket);
    //     Product.hasMany(models.Fav);
    //     Product.hasMany(models.Image);
    // }

    return Product;
}