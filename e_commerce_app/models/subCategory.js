module.exports = (sequelize, Sequelize) => {
    return sequelize.define("SubCategories", {

        // c_id: {
        //     type: Sequelize.INTEGER,

        //     references: {
        //         model: "Categories",

        //         key: 'id'
        //     },

        //     allowNull: false
        // },

        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}