/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareObject_has_objectFile', {
		softwareObject_softwareObjectID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		softwareObjectFileID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		softwareObjectFileLabel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		softwareObjectFile_usesMountFormat: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'mountFormat',
				key: 'mountFormatQID'
			}
		}
	}, {
		tableName: 'softwareObject_has_objectFile'
	});
};
