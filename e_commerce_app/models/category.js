module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Categories", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}