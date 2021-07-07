var express = require('express');
var router = express.Router();
var app = express();
var PORT = 3000;

let { sequelize } = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

sequelize.sync().then(() => {
  console.log("Database connection is successful");
}, (err) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log("Express server listening port " +PORT);
})

module.exports = router;
