module.exports = (sequelize, Sequelize) => {
  var Users = sequelize.define("Users", {
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    birthdate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      // get() {
      //     return moment(this.getDataValue('birthdate')).format('DD.MM.YYYY');
      // }
      dialectOptions: {
        useUTC: false, // for reading from database
      },
    },

    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    access_token: {
      type: Sequelize.STRING,
    },
  });

  return Users;
};
