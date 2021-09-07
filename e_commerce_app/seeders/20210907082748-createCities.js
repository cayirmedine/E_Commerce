'use strict';
const { city } = require("../sql/city");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.query(city);
    } catch(error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Cities', null, {});
  }
};
