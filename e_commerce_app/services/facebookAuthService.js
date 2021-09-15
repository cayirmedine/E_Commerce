var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

const { usersModel, sequelize } = require("../database/db");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      usersModel.findOrCreate(
        { where: { fullName: profile.name } },
        (err, user) => {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);
