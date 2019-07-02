/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('systemRequirements_includes_gpuDevice', {
		systemRequirements_systemRequirementsID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		systemRequirements_gpuDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'gpuDevice',
				key: 'gpuDeviceID'
			}
		},
		systemRequirements_minimumGpuRAM: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'systemRequirements_includes_gpuDevice'
	});
};
