export default (sequelize, DataTypes) => {
    return sequelize.define('cpuArchitecture', {
        cpuArchitectureQID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        cpuArchitectureName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'cpuArchitecture'
    });
}
