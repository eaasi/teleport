/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('systemRequirements_includes_softwareVersion', {
        systemRequirements_systemRequirementsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'systemRequirements',
                key: 'systemRequirementsID'
            }
        },
        systemRequirements_softwareVersionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareVersion',
                key: 'softwareVersionID'
            }
        }
    }, {
        tableName: 'systemRequirements_includes_softwareVersion'
    });
}
