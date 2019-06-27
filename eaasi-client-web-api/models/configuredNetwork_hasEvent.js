export default (sequelize, DataTypes) => {
    return sequelize.define('configuredNetwork_hasEvent', {
        configuredNetwork_configuredNetworkID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'configuredNetwork',
                key: 'configuredNetworkID'
            }
        },
        event_eventID: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'configuredNetwork_hasEvent'
    });
}
