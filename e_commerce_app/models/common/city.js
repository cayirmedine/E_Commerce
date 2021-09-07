module.exports = (sequelize, Sequelize) => {
    var City = sequelize.define("Cities", {
        cityName: {
            type: Sequelize.STRING,
            allowNull: false
          },
    })

    return City;
}