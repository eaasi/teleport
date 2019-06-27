/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('pointerDevice_has_machineInterface', {
        pointerDevice_pointerDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pointerDevice',
                key: 'pointerDeviceID'
            }
        },
        pointerDevice_machineInterfaceID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'pointerDevice_has_machineInterface'
    });
}
