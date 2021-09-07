const validator = require("./validate");

module.exports = {
  signUp: (req, res, next) => {
    const validationRule = {
      fullName: "required|string",
      email: "required|email",
      password: "required|string|min:6",
      phone: ["required", "string", "regex:/^[0-9]{10}$/"],
      birthdate: "required|date",
      gender: "required|string",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  updateUser: (req, res, next) => {
    const validationRule = {
      fullName: "string",
      email: "email",
      password: "string|min:6",
      phone: ["string", "regex:/^[0-9]{10}$/"],
      birthdate: "date",
      gender: "string",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },

  addAddress: (req, res, next) => {
    const validationRule = {
      addressType: ["required", "in:Bill,Delivery"],
      addressTitle: "required|string",
      fullname: "required|string",
      city: "required|string",
      town: "required|string",
      neighbourhood: "required|string",
      addressDetail: "required|string",
      zipCode: "numeric",
      phone: ["required", "string", "regex:/^[0-9]{10}$/"],
      city_id: "required|integer",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "Error", data: error });
      } else {
        next();
      }
    });
  },
};
