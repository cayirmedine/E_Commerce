var Sequelize = require("sequelize");

var sequelize = new Sequelize("E_Commerce", "root", "929307_Hm", {
    host: "localhost",
    dialect: "mysql"
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
const usersModel = users(sequelize, Sequelize);
const addressModel = address(sequelize, Sequelize);
const basketModel = basket(sequelize, Sequelize);
const catModel = category(sequelize, Sequelize);
const favModel = favorites(sequelize, Sequelize);
const orderModel = orders(sequelize, Sequelize);
const sliderModel = slider(sequelize, Sequelize);
const subCatModel = subCategory(sequelize, Sequelize);
const productModel = product(sequelize, Sequelize);

module.exports = {
    usersModel,
    addressModel,
    basketModel,
    catModel,
    favModel,
    orderModel,
    sliderModel,
    subCatModel,
    productModel,
    sequelize,
    Sequelize
};