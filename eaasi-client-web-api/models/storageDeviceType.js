/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('storageDeviceType', {
        storageDeviceTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        storageDeviceTypeQID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        storageDeviceTypeName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'storageDeviceType'
    });
}
