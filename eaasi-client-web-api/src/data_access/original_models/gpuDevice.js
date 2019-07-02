/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('gpuDevice', {
		gpuDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		gpuDeviceQID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		gpuDeviceName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'gpuDevice'
	});
};
