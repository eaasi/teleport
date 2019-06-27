/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('systemRequirements_includes_cpuArchitecture', {
        systemRequirements_systemRequirementsID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'systemRequirements',
                key: 'systemRequirementsID'
            }
        },
        systemRequirements_cpuArchitecture: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'cpuArchitecture',
                key: 'cpuArchitectureQID'
            }
        }
    }, {
        tableName: 'systemRequirements_includes_cpuArchitecture'
    });
}
