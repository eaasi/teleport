/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('configuredStorageDevice', {
        configuredMachine_machineID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'configuredMachine',
                key: 'configuredMachineID'
            }
        },
        configureStorageDevice_storageDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'storageDevice',
                key: 'storageDeviceID'
            }
        },
        configuredStorageDevice_usesMachineInterface: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        configuredStorageDevice_idBootOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'configuredStorageDevice'
    });
}
