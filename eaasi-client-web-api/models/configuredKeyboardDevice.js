/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('configuredKeyboardDevice', {
        configuredMachine_machineID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'configuredMachine',
                key: 'configuredMachineID'
            }
        },
        configuredKeyboardDevice_keyboardDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'keyboardDevice',
                key: 'keyboardDeviceID'
            }
        },
        configuredKeyboardDevice_usesMachineInterface: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'configuredKeyboardDevice'
    });
}
