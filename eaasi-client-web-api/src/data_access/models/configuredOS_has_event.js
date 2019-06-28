export default (sequelize, DataTypes) => {
    return sequelize.define('configuredOS_has_event', {
        configuredOS_configuredOperatingSystemID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'configuredOS',
                key: 'configuredOperatingSystemID'
            }
        },
        event_eventID: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'configuredOS_has_event'
    });
}
