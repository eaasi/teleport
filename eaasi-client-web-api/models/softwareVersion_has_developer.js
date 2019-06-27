/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('softwareVersion_has_developer', {
        softwareVersion_softwareVersionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'softwareVersion',
                key: 'softwareVersionID'
            }
        },
        softwareVersion_softwareDeveloperQID: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'developer',
                key: 'developerQID'
            }
        }
    }, {
        tableName: 'softwareVersion_has_developer'
    });
}
