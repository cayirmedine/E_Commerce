module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Products", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        unitPrice: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },

        desc: {
            type: Sequelize.STRING,
        }
    })
}