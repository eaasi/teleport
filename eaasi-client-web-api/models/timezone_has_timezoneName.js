/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('timezone_has_timezoneName', {
        timezone_timezoneQID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'timezone',
                key: 'timezoneQID'
            }
        },
        timezoneName_timezoneNameID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'timezoneName',
                key: 'timezoneNameID'
            }
        }
    }, {
        tableName: 'timezone_has_timezoneName'
    });
}
