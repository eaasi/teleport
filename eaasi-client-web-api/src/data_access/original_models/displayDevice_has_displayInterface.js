/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('displayDevice_has_displayInterface', {
		displayDevice_displayDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'displayDevice',
				key: 'displayDeviceID'
			}
		},
		displayInterface_displayInterfaceID: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'displayDevice_has_displayInterface'
	});
};
