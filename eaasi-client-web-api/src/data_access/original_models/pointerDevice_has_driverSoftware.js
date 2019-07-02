/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pointerDevice_has_driverSoftware', {
		pointerDevice_pointerDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'pointerDevice',
				key: 'pointerDeviceID'
			}
		},
		pointerDevice_driverSoftwareID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, {
		tableName: 'pointerDevice_has_driverSoftware'
	});
};
