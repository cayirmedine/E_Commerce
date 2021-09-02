let random = require("random-key");

const { addressModel } = require("../database/db");
const modelService = require("../services/modelService");

(module.exports.createAddress = async (req, next) => {
  try {
    const address = await modelService.create(addressModel, req.body);
    return address;
  } catch (error) {
    error.msg = "Create address in not successful: " + error;
    next(error);
  }
}),
  (module.exports.userAddresses = async (req) => {
    let user_id = req.params.userId;
    let options = {
      where: {
        user_id: user_id,
      },
    };

    try {
      const userAddresses = await modelService.findAll(addressModel, options);
      return userAddresses;
    } catch (error) {
      error.msg = "Get users addresses in not successful: " + error;
      next(error);
    }
  });
