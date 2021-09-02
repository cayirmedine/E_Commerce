module.exports = (sequelize, Sequelize) => {
    var Image = sequelize.define("Images", {
        uri: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Image;
}