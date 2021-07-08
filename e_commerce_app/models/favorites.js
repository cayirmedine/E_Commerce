module.exports = (sequelize, Sequelize) => {
    var Fav = sequelize.define("Favorites", {
        
    })

    // Fav.associate = models => {
    //     Fav.belongsTo(models.Users);
    // }

    return Fav;
}