/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('configuredSoftware_has_event', {
        configuredSoftware_configuredSoftwareManifestationID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'configuredSoftware',
                key: 'configuredSoftwareVersionID'
            }
        },
        event_eventID: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'configuredSoftware_has_event'
    });
}
