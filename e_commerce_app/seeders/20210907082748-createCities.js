'use strict';
const { city } = require("../sql/city");
const { sequelize } = require("../database/db");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await sequelize.query(city);
    } catch(error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Cities', null, {});
  }
};
