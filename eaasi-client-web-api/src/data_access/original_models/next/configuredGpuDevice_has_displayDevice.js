/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('configuredGpuDevice_has_displayDevice', {
		configuredMachine_machineID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		configuredGpuDevice_gpuDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredGpuDevice',
				key: 'configuredGpuDevice_gpuDeviceID'
			}
		},
		configuredGpuDevice_displayDeviceID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'displayDevice',
				key: 'displayDeviceID'
			}
		},
		displayDevice_usesDisplayInterface: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'configuredGpuDevice_has_displayDevice'
	});
};
