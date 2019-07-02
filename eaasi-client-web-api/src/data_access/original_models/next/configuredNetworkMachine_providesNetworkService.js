/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('configuredNetworkMachine_providesNetworkService', {
		configuredNetworkMachine_configuredNetworkID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredNetwork_has_configuredMachine',
				key: 'configuredNetwork_configuredNetworkID'
			}
		},
		configuredNetworkMachine_configuredMachineID: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		configuredNetworkMachine_providesNetworkServiceID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'networkService',
				key: 'networkServiceID'
			}
		},
		servicePortExposed: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'configuredNetworkMachine_providesNetworkService'
	});
};
