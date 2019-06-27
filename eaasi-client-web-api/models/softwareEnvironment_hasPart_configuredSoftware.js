export default (sequelize, DataTypes) => {
    return sequelize.define('softwareEnvironment_hasPart_configuredSoftware', {
        softwareEnvironment_softwareEnvironmentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareEnvironment',
                key: 'softwareEnvironmentID'
            }
        },
        hasConfiguredSoftware: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'configuredSoftware',
                key: 'configuredSoftwareVersionID'
            }
        }
    }, {
        tableName: 'softwareEnvironment_hasPart_configuredSoftware'
    });
}
