const { usersModel, cityModel } = require("../database/db");
const modelService = require("../services/modelService");
const { createAddress, userAddresses } = require("../services/userService");
const attributes = require("../helpers/attributes");

let random = require("random-key");
const {
  googleVerifyService,
  facebookVerifyService,
  appleVerifyService
} = require("../services/verifyService");

module.exports = {
  //POST /user/sign-up
  signUp: async (req, res, next) => {
    const { fullName, phone, email, password, birthdate, gender } = req.body;

    try {
      let options = {
        where: {
          phone: phone,
        },
        defaults: {
          fullName,
          phone,
          email,
          password,
          birthdate,
          gender,
          access_token: random.generate(250),
        },
      };

      await console.log(options.where);
      await console.log(options.defaults);
      const user = await modelService.findOrCreate(usersModel, options);

      if (user) {
        res.json({ status: "Success", data: user });
      } else {
        res
          .status(422)
          .send({ status: "Error", error: "User is already exists" });
      }
    } catch (error) {
      error.msg = "Missing parameter(s)";
      next(error);
    }
  },

  //POST /user/sign-in
  signIn: async (req, res, next) => {
    const { phone, password } = req.body;

    let options = {
      attributes: attributes.usersModel,
      where: {
        phone: phone,
        password: password,
      },
    };

    try {
      const user = await modelService.findOne(usersModel, options);

      if (user != null) {
        res.json({ status: "Success", data: user });
      } else {
        res.status(422).send({
          status: "Error",
          error: "Username or password is not correct",
        });
      }
    } catch (error) {
      error.msg = "Missing parameter(s)";
      next(error);
    }
  },

  signInGoogle: async (req, res, next) => {
    try {
      const { token } = req.body;
      await console.log("Token", token);
      let verifyInfo = await googleVerifyService(token);
      await console.log("VerifyInfo", verifyInfo);

      if (verifyInfo) {
        let options = {
          where: {
            email: verifyInfo.email,
          },
        };

        let createdUserOptions = {
          email: verifyInfo.email,
          fullName: verifyInfo.fullName,
          phone: "5555555555",
          password: "1111111",
          birthdate: "01-01-1999",
          gender: "Female",
          access_token: random.generate(250),
        };

        const user = await modelService.findOne(usersModel, options);

        if (user) {
          if (user.password != null) {
            res.json({
              status: "Success",
              message: "This account is already exists",
              data: {
                access_token: user.dataValues.access_token,
                id: user.dataValues.id,
                fullName: user.dataValues.fullName,
                phone: user.dataValues.phone,
                email: user.dataValues.email,
                birthdate: user.dataValues.birthdate,
                gender: user.dataValues.gender,
              },
            });
          } else {
            res.json({
              status: "Success",
              message: "Password creation",
              data: {
                access_token: user.dataValues.access_token,
                id: user.dataValues.id,
                fullName: user.dataValues.fullName,
                phone: user.dataValues.phone,
                email: user.dataValues.email,
              },
            });
          }
        } else {
          const newUser = await modelService.create(
            usersModel,
            createdUserOptions
          );
          res.json({
            status: "success",
            message: "new account has been created.",
            data: {
              access_token: newUser.dataValues.access_token,
              id: newUser.dataValues.id,
              fullName: newUser.dataValues.fullName,
              email: newUser.dataValues.email,
            },
          });
        }
      }
    } catch (error) {
      error.msg = "Google Auth Fail";
      next(error);
    }
  },

  signInFacebook: async (req, res, next) => {
    try {
      const { token, email, fullName } = req.body;
      let verifyInfo = await facebookVerifyService(token);
      if (!verifyInfo.includes("error")) {
        let options = {
          where: {
            email: email,
          },
        };
        let createdUserOptions = {
          email: email,
          fullName: fullName,
          phone: "5555555555",
          password: "1111111",
          birthdate: "01-01-1999",
          gender: "Female",
          access_token: random.generate(250),
        };
        const user = await modelService.findOne(usersModel, options);
        if (user) {
          if (user.password != null) {
            res.json({
              status: "Success",
              message: "This account already exists",
              data: {
                access_token: user.dataValues.access_token,
                id: user.dataValues.id,
                fullName: user.dataValues.fullName,
                email: user.dataValues.email,
                phone: user.dataValues.phone,
              },
            });
          } else {
            res.json({
              status: "Success",
              message: "Password creation",
              data: {
                access_token: user.dataValues.access_token,
                id: user.dataValues.id,
                fullName: user.dataValues.fullName,
                email: user.dataValues.email,
              },
            });
          }
        } else {
          const newUser = await modelService.create(
            usersModel,
            createdUserOptions
          );
          res.json({
            status: "Success",
            message: "New account has been created.",
            data: {
              access_token: newUser.dataValues.access_token,
              id: newUser.dataValues.id,
              fullName: newUser.dataValues.fullName,
              email: newUser.dataValues.email,
            },
          });
        }
      } else {
        res.status(500).send({
          status: "Error",
          message: "Facebook Auth Error",
        });
      }
    } catch (error) {
      error.msg = "Facebook Auth Error";
      next(error);
    }
  },

  signInApple: async (req, res, next) => {
    try {
      const { token, fullName } = req.body;
      let verifyInfo = await appleVerifyService(token)
      if(verifyInfo.email_verified == 'true') {
        let options = {
          where: {
            email: verifyInfo.email,
          }
        }
        let createdUserOptions = {
          email: verifyInfo.email,
          fullName: fullName,
          phone: "5555555555",
          password: "1111111",
          birthdate: "01-01-1999",
          gender: "Female",
          access_token: random.generate(250),
        }
        const user = await modelService.findOne(usersModel, options);
        if(user) {
          if(user.password != null) {
            res.json({
              status: "Success",
              message: 'This account already exists',
              data: {
                access_token: user.dataValues.access_token,
                id: user.dataValues.id,
                fullName: user.dataValues.fullName,
                email: user.dataValues.email,
                phone: user.dataValues.phone,
              }
            });
          } else {
            res.json({
              status: 'Success',
              message: 'Password creation',
              data: {
                access_token: user.dataValues.access_token,
                id: user.dataValues.id,
                fullName: user.dataValues.fullName,
                email: user.dataValues.email,
              }
            })
          }
        } else {
          const newUser = await modelService.create(usersModel, createdUserOptions);
          res.json({
            status: 'Success',
            message: 'New account has been created.',
            data: {
              access_token: newUser.dataValues.access_token,
              id: newUser.dataValues.id,
              fullName: newUser.dataValues.fullName,
              email: newUser.dataValues.email,
            }
          })
        }
      } else {
        res.status(500).send({
          status: 'Error',
          message: 'Apple Auth Error',
        })
      }
    } catch (error) {
      error.msg = "Apple Auth Error " +error;
      next(error);
    }
  },

  //GET /user/cities/:cityId
  findCity: async (req, res, next) => {
    const { cityId } = req.params;

    try {
      const city = await modelService.findOne(cityModel, {
        where: { id: cityId },
      });

      res.json({ status: "Success", data: city.cityName });
    } catch (error) {
      error.message = "Get city name is not successful: " + error;
      next(error);
    }
  },

  //POST /user/add-address
  createAddress: async (req, res, next) => {
    try {
      const address = await createAddress(req, next);
      res.json({ status: "Success", data: address });
    } catch (error) {
      error.message = "Create address is not successful";
      console.log(error);
      next(error);
    }
  },

  //GET /user/addresses/:userId
  userAddresses: async (req, res, next) => {
    try {
      const addresses = await userAddresses(req);
      res.json({ status: "Success", data: addresses });
    } catch (error) {
      error.message = "Get users addresses is not successful: " + error;
      next(error);
    }
  },

  //PUT /password/:userId
  userChangePassword: async (req, res, next) => {
    const { password } = req.body;
    const { userId } = req.params;

    let attributes = {};
    attributes.password = password;

    let condition = {
      where: {
        id: userId,
      },
    };

    try {
      await modelService.update(usersModel, attributes, condition);
      res.json({ status: "Success", data: "Password is changed." });
    } catch (error) {
      error.message = "Change password is not successful: " + error;
      next(error);
    }
  },

  //PUT /update-info/:userId
  userUpdateInfo: async (req, res, next) => {
    const { userId } = req.params;
    const { fullName, phone, email, password, birthdate, gender } = req.body;

    let attributes = {};
    attributes.fullName = fullName;
    attributes.phone = phone;
    attributes.email = email;
    attributes.password = password;
    attributes.birthdate = birthdate;
    attributes.gender = gender;

    let contidion = {
      where: {
        id: userId,
      },
    };

    try {
      const updateUser = await modelService.update(
        usersModel,
        attributes,
        contidion
      );
      res.json({ status: "Success", data: updateUser });
    } catch (error) {
      error.message = "Update user is not successful: " + error;
      next(error);
    }
  },
};
