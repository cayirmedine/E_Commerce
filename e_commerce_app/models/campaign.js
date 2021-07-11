module.exports = (sequelize, Sequelize) => {
    var Campaign = sequelize.define("Campaigns", {

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        desc: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    })
    return Campaign;
}