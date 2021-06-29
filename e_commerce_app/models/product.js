module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Products", {
        c_id: {
            type: Sequelize.INTEGER,

            references: {
                model: "Categories",

                key: 'id'
            },

            allowNull: false
        },

        sc_id: {
            type: Sequelize.INTEGER,

            references: {
                model: "SubCategories",

                key: 'id'
            },

            allowNull: false
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        imgPath: {
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