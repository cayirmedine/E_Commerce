module.exports = (sequelize, Sequelize) => {
    var Slider = sequelize.define("Sliders", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    // Slider.associate = models => {
    //     Slider.hasOne(models.Image);
    // }

    return Slider;
}