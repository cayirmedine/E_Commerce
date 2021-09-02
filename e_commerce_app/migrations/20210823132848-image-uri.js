'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("Images","uri", { type: Sequelize.DataTypes.STRING }, { transaction });
      await transaction.commit();
    } catch(error) {
      console.log("Transaction error");
      await transaction.rollback();
      throw error;
    }
    
  },

  down: async (queryInterface, Sequelize) => {
     const transaction = await queryInterface.sequelize.transaction();

     try{
       await queryInterface.removeColumn("Images", "uri", { transaction });
       await transaction.commit();
     } catch(error) {
       await transaction.rollback();
       throw error;
     }
  }
};
