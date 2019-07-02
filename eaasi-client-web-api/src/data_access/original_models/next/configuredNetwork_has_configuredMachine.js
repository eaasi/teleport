/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('configuredNetwork_has_configuredMachine', {
		configuredNetwork_configuredNetworkID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredNetwork',
				key: 'configuredNetworkID'
			}
		},
		configuredNetwork_machineID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredMachine',
				key: 'configuredMachineID'
			}
		},
		bootOrder: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		staticIpAddress: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'configuredNetwork_has_configuredMachine'
	});
};
