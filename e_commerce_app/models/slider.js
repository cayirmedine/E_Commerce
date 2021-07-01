module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Sliders", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        imgPath: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}