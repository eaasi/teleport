/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pointerDeviceType', {
		pointerDeviceTypeID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		pointerDeviceTypeName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		pointerDeviceTypeQID: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'pointerDeviceType'
	});
};
