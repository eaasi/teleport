/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('osVersion_has_programmingLanguage', {
        osVersion_osVersionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'osVersion',
                key: 'osVersionID'
            }
        },
        osVersion_programmingLanguageQID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'programmingLanguage',
                key: 'programmingLanguageQID'
            }
        }
    }, {
        tableName: 'osVersion_has_programmingLanguage'
    });
}
