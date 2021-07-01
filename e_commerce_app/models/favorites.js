module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Favorites", {
        // u_id: {
        //     type: Sequelize.INTEGER,

        //     references: {
        //         model: "Users",
        //         key: 'id'
        //     },

        //     allowNull: false
        // },

        // p_id: {
        //     type: Sequelize.INTEGER,

        //     references: {
        //         model: "Products",
        //         key: 'id'
        //     },

        //     allowNull: false
        // }
    })
}