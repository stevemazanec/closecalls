module.exports = function (sequelize, DataTypes) {
    var Report = sequelize.define("Report", {
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        address: DataTypes.STRING,
        latitude: DataTypes.DECIMAL(20, 10),
        longitude: DataTypes.DECIMAL(20, 10),
        comment: DataTypes.TEXT
    });

    return Report;
};
