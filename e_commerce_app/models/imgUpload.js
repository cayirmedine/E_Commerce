module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Images", {
        uri: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}