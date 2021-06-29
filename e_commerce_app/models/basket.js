module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Baskets", {
        u_id: {
            type: Sequelize.INTEGER,
            reference: {
                model: "Users",
                key: "id"
            },
            allowNull: false
        },

        p_id: {
            type: Sequelize.INTEGER,
            reference: {
                model: "Products",
                key: "id"
            },

            allowNull: false
        }
    })
}