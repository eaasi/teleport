export default (sequelize, DataTypes) => {
    return sequelize.define('audioDevice_has_machineInterface', {
        audioDevice_audioDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audioDevice',
                key: 'audioDeviceID'
            }
        },
        audioDevice_machineInterfaceID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'audioDevice_has_machineInterface'
    });
}
