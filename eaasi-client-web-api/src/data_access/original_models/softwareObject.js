/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareObject', {
		softwareObjectID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		softwareObject_inNetwork: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		softwareObject_hasSourceOrg: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		softwareObjectProductKey: {
			type: DataTypes.STRING,
			allowNull: true
		},
		softwareObjectHelpText: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'softwareObject'
	});
};
