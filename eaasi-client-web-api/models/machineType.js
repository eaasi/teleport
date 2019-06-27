/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('machineType', {
        machineTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        machineTypeName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'machineType'
    });
}
