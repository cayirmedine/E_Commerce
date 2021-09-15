const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { usersModel, sequelize } = require("../database/db");

require("dotenv").config();

const t = sequelize.transaction();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      await console.log("Profile", profile);
      await console.log("Access Token", accessToken);
      await usersModel.findOne(
        {
          where: { email: profile.email },
        },
        async (err, user) => {
          await console.log("User", user);
          if (!user) {
            await console.log("TESTT");
            usersModel.create({
              fullName: profile.displayName,
              phone: "5555555555",
              email: profile.email,
              password: "123456789",
              birthdate: "06-07-1999",
              gender: "Female",
              access_token: accessToken,
            });
          }
          return done(err, user);
        }
      );
      return done(null, profile);
    }
  )
);
