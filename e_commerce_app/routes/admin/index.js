var express = require('express');
var router = express.Router();
var app = express();

let { sequelize } = require("../../database/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

sequelize.sync().then(() => {
  console.log("Database connection is successful");
}, (err) => {
  console.log(err);
});

module.exports = router;
