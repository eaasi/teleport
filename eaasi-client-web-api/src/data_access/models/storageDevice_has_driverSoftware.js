export default (sequelize, DataTypes) => {
    return sequelize.define('storageDevice_has_driverSoftware', {
        storageDevice_storageDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'storageDevice',
                key: 'storageDeviceID'
            }
        },
        storageDevice_driverSoftwareID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareVersion',
                key: 'softwareVersionID'
            }
        }
    }, {
        tableName: 'storageDevice_has_driverSoftware'
    });
}
