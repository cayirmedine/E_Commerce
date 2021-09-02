'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("Campaigns", "startDate", { type: Sequelize.DataTypes.DATE }, { transaction });
      await transaction.commit();
    } catch(error) {
      console.log("Transaction error");
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("Campaigns", "startDate", { transaction });
      await transaction.commit();
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }
};
