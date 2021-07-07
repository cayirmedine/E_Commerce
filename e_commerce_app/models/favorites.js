module.exports = (sequelize, Sequelize) => {
    var Fav = sequelize.define("Favorites", {
        
    })

    Fav.associate = models => {
        Fav.belongsTo(Users, {foreignKey: "user_id"});
    }

    return Fav;
}