export default (sequelize, DataTypes) => {
    return sequelize.define('osVersion_has_softwareLicense', {
        osVersion_osVersionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'osVersion',
                key: 'osVersionID'
            }
        },
        osVersion_softwareLicenseQID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'softwareLicense',
                key: 'softwareLicenseQID'
            }
        }
    }, {
        tableName: 'osVersion_has_softwareLicense'
    });
}
