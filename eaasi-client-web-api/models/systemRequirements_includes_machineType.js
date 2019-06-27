/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('systemRequirements_includes_machineType', {
        systemRequirements_systemRequirementsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'systemRequirements',
                key: 'systemRequirementsID'
            }
        },
        systemRequirements_machineTypeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'machineType',
                key: 'machineTypeID'
            }
        }
    }, {
        tableName: 'systemRequirements_includes_machineType'
    });
}
