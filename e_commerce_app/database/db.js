var Sequelize = require("sequelize");

var dotenv = require('dotenv');
dotenv.config();

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // dialectOptions: {
    //     useUTC: false, //for reading from database
    //     dateStrings: true,
    //     typeCast: true
    // },
    // timezone: '+03:00'
}); 

const users = require('../models/user/users');
const address = require('../models/user/address');
const basket = require('../models/cart/basket');
const category = require('../models/product/category');
const campaign = require('../models/home/campaign');
const favorites = require('../models/home/favorites');
const orders = require('../models/cart/orders');
const slider = require('../models/home/slider');
const subCategory = require('../models/product/subCategory');
const product = require('../models/product/product');
const images = require('../models/common/imgUpload');
const campProduct = require('../models/product/campaignProduct');

const usersModel = users(sequelize, Sequelize);
const addressModel = address(sequelize, Sequelize);
const basketModel = basket(sequelize, Sequelize);
const campaignModel = campaign(sequelize, Sequelize);
const productCatModel = category(sequelize, Sequelize);
const favModel = favorites(sequelize, Sequelize);
const orderModel = orders(sequelize, Sequelize);
const sliderModel = slider(sequelize, Sequelize);
const productSubCatModel = subCategory(sequelize, Sequelize);
const productModel = product(sequelize, Sequelize);
const imageModel = images(sequelize, Sequelize);
const campaignProductModel = campProduct(sequelize, Sequelize);

addressModel.belongsTo(usersModel, {foreignKey: "user_id"});
addressModel.hasOne(orderModel, {foreignKey: "address_id"});
basketModel.belongsTo(usersModel, {foreignKey: "user_id"});
campaignModel.hasOne(imageModel, {foreignKey: "campaign_id"});
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
campaignModel.hasOne(sliderModel, {foreignKey: "campaign_id"});
campaignModel.hasMany(campaignProductModel, {foreignKey: "campaign_id"});
productModel.hasMany(campaignProductModel, {foreignKey:"product_id"});

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
    campaignModel,
    imageModel,
    campaignProductModel,
    sequelize,
    Sequelize
};