/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('digitalObjectFile_has_objectFileOperation', {
        digitalObjectFile_digitalObjectID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        digitalObjectFile_fileID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'digitalObject_has_objectFile',
                key: 'digitalObjectFileID'
            }
        },
        digitalObjectFile_operationID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'objectFileOperation',
                key: 'operationID'
            }
        },
        digitalObjectFile_operationOrder: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'digitalObjectFile_has_objectFileOperation'
    });
}
