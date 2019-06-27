/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('computingEnvironment', {
        computingEnvironmentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        computingEnvironment_hasSourceOrg: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        computingEnvironment_inNetwork: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        computingEnvironment_configuredNetworkID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'configuredNetwork',
                key: 'configuredNetworkID'
            }
        },
        computingEnvironment_softwareEnvironmentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'softwareEnvironment',
                key: 'softwareEnvironmentID'
            }
        }
    }, {
        tableName: 'computingEnvironment'
    });
}
