export default (sequelize, DataTypes) => {
    return sequelize.define('osVersion_keyboardLayoutSettings', {
        osVersion_osVersionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'osVersion',
                key: 'osVersionID'
            }
        },
        osVersion_keyboardLayoutQID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'keyboardLayout',
                key: 'keyboardLayoutQID'
            }
        },
        osVersion_keyboardLayoutName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'osVersion_keyboardLayoutSettings'
    });
}
