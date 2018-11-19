module.exports = function (sequelize, DataTypes) {
    var Report = sequelize.define("Report", {
        date: {
            type: DataTypes.DATEONLY,
            isDate: true,
            len: 10
        },
        time: {
            type: DataTypes.STRING,
            len: 8
        },
        latitude: {
            type: DataTypes.DECIMAL(20, 10),
            min: 41.4,
            max: 41.6
        },
        longitude: {
            type: DataTypes.DECIMAL(20, 10),
            min: -81.8,
            max: -81.6
        },
        comment: DataTypes.TEXT
    });

    return Report;
};
