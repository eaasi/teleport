/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareObjectFile_has_objectFileOperation', {
		softwareObjectFile_softwareObjectID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareObject_has_objectFile',
				key: 'softwareObjectFileID'
			}
		},
		softwareObjectFile_fileID: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		softwareObjectFile_operationID: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		softwareObjectFile_operationOrder: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'softwareObjectFile_has_objectFileOperation'
	});
};
