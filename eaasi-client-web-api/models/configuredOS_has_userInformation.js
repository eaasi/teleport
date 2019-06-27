export default (sequelize, DataTypes) => {
    return sequelize.define('configuredOS_has_userInformation', {
        configuredOS_configuredOperatingSystemID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'configuredOS',
                key: 'configuredOperatingSystemID'
            }
        },
        userInformation_userInformationID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'userInformation',
                key: 'userInformationID'
            }
        }
    }, {
        tableName: 'configuredOS_has_userInformation'
    });
}
