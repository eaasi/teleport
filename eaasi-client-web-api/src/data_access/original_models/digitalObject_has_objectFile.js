/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('digitalObject_has_objectFile', {
		digitalObject_digitalObjectID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		digitalObjectFileID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		digitalObjectFileLabel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		digitalObjectFile_usesMountFormat: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'mountFormat',
				key: 'mountFormatQID'
			}
		}
	}, {
		tableName: 'digitalObject_has_objectFile'
	});
};
