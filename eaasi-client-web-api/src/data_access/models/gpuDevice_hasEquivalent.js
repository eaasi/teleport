export default (sequelize, DataTypes) => {
    return sequelize.define('gpuDevice_hasEquivalent', {
        gpuDevice_gpuDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'gpuDevice',
                key: 'gpuDeviceID'
            }
        },
        gpuDevice_equivalentGpuDevice: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'gpuDevice_hasEquivalent'
    });
}
