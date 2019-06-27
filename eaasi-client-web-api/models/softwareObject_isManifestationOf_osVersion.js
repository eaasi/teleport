/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('softwareObject_isManifestationOf_osVersion', {
        softwareObject_softwareObjectID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'softwareObject',
                key: 'softwareObjectID'
            }
        },
        softwareObject_osVersionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'osVersion',
                key: 'osVersionID'
            }
        }
    }, {
        tableName: 'softwareObject_isManifestationOf_osVersion'
    });
}
