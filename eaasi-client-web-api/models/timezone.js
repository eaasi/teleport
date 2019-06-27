export default (sequelize, DataTypes) => {
    return sequelize.define('timezone', {
        timezoneQID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        utcOffset: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'timezone'
    });
}
