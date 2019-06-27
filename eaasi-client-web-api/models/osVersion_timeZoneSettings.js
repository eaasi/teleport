/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('osVersion_timeZoneSettings', {
        osVersion_osVersionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'osVersion',
                key: 'osVersionID'
            }
        },
        osVersion_timezoneQID: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'timezone',
                key: 'timezoneQID'
            }
        },
        osVersion_timezoneName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'osVersion_timeZoneSettings'
    });
}
