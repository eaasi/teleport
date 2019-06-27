export default (sequelize, DataTypes) => {
    return sequelize.define('displayDevice_has_driverSoftware', {
        displayDevice_displayDeviceID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'displayDevice',
                key: 'displayDeviceID'
            }
        },
        displayDevice_driverSoftwareID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareVersion',
                key: 'softwareVersionID'
            }
        }
    }, {
        tableName: 'displayDevice_has_driverSoftware'
    });
}
