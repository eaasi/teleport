/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pointerDevice', {
		pointerDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		pointerDeviceQID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		pointerDeviceName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		pointerDeviceType: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'pointerDeviceType',
				key: 'pointerDeviceTypeID'
			}
		}
	}, {
		tableName: 'pointerDevice'
	});
};
