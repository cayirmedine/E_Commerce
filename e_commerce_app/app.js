var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const session = require("express-session");
var passport = require("passport");
require("./services/googleAuthService");
require("./services/facebookAuthService");

var indexRouter = require("./routes/admin/index");
var usersRouter = require("./routes/mobile/user");
var productRouter = require("./routes/mobile/product");
var cartRouter = require("./routes/mobile/cart");
var homeRouter = require("./routes/mobile/home");
var productAdminRouter = require("./routes/admin/products");
var authRouter = require("./routes/mobile/auth");

var app = express();
app.use(session({ secret: "cats" }));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(upload.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/home", homeRouter);
app.use("/auth", authRouter);
app.use("/admin/product", productAdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.set("etag", false);

module.exports = app;
