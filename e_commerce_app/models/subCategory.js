module.exports = (sequelize, Sequelize) => {
    return sequelize.define("SubCategories", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}