const { usersModel, cityModel } = require("../database/db");
const modelService = require("../services/modelService");
const { createAddress, userAddresses } = require("../services/userService");
const attributes = require("../helpers/attributes");

let random = require("random-key");

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
