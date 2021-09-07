'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("Addresses", "city_id", { type: Sequelize.INTEGER }, { transaction });

      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try{
      await queryInterface.removeColumn("Addresses", "city_id", { transaction });
      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
};
