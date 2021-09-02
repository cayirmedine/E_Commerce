module.exports = (sequelize, Sequelize) => {
    var Campaign = sequelize.define("Campaigns", {

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false
        },

        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },

        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            defaultValue: false
        },

        isInSlider: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
        
    })
    return Campaign;
}