/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('softwareVersion_isCompatibleWith_computingEnvironment', {
        sofwareVersion_softwareVersionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'softwareVersion',
                key: 'softwareVersionID'
            }
        },
        compatibleComputingEnvironmentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'computingEnvironment',
                key: 'computingEnvironmentID'
            }
        }
    }, {
        tableName: 'softwareVersion_isCompatibleWith_computingEnvironment'
    });
}
