var Sequelize = require("sequelize");

var dotenv = require('dotenv');
dotenv.config();

var sequelize = new Sequelize('heroku_c7ac27e1b5b8c54', 'b74f8d3df89bcd', '389ac2d9', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql'
}); 

const users = require('../e_commerce_app/models/users');
const address = require('../e_commerce_app/models/address');
const basket = require('../e_commerce_app/models/basket');
const category = require('../e_commerce_app/models/category');
const favorites = require('../e_commerce_app/models/favorites');
const orders = require('../e_commerce_app/models/orders');
const slider = require('../e_commerce_app/models/slider');
const subCategory = require('../e_commerce_app/models/subCategory');
const product = require('../e_commerce_app/models/product');
const images = require('../e_commerce_app/models/imgUpload');

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
basketModel.hasOne(orderModel, {foreignKey: "basket_id"});
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