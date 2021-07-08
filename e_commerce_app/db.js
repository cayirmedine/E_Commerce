var Sequelize = require("sequelize");

var dotenv = require('dotenv');
dotenv.config();

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
}); 

const users = require('./models/users');
const address = require('./models/address');
const basket = require('./models/basket');
const category = require('./models/category');
const favorites = require('./models/favorites');
const orders = require('./models/orders');
const slider = require('./models/slider');
const subCategory = require('./models/subCategory');
const product = require('./models/product');
const images = require('./models/imgUpload');

const usersModel = users(sequelize, Sequelize);
const addressModel = address(sequelize, Sequelize);
const basketModel = basket(sequelize, Sequelize);
const productCatModel = category(sequelize, Sequelize);
const favModel = favorites(sequelize, Sequelize);
const orderModel = orders(sequelize, Sequelize);
const sliderModel = slider(sequelize, Sequelize);
const productSubCatModel = subCategory(sequelize, Sequelize);
const productModel = product(sequelize, Sequelize);
const imageModel = images(sequelize, Sequelize);

addressModel.belongsTo(usersModel, {foreignKey: "user_id"});
addressModel.hasOne(orderModel, {foreignKey: "address_id"});
basketModel.belongsTo(usersModel, {foreignKey: "user_id"});
//basketModel.hasOne(orderModel, {foreignKey: "basket_id"});
productCatModel.hasOne(imageModel, {foreignKey: "cat_id"});
favModel.belongsTo(usersModel, {foreignKey: "user_id"});
orderModel.belongsTo(usersModel, {foreignKey: "user_id"});
productModel.belongsTo(productSubCatModel, {foreignKey: "subCat_id"});
productModel.belongsTo(productCatModel, {foreignKey: "cat_id"});
productModel.hasMany(basketModel, {foreignKey: "product_id"});
productModel.hasMany(favModel, {foreignKey: "product_id"});
productModel.hasMany(imageModel, {foreignKey: "product_id"});
sliderModel.hasOne(imageModel, {foreignKey: "slider_id"});
productSubCatModel.belongsTo(productCatModel, {foreignKey: "cat_id"});

module.exports = {
    usersModel,
    addressModel,
    basketModel,
    productCatModel,
    favModel,
    orderModel,
    sliderModel,
    productSubCatModel,
    productModel,
    imageModel,
    sequelize,
    Sequelize
};