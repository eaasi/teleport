'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkMachineProvidesNetworkService extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetworkMachineProvidesNetworkService.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredNetworkMachine_configuredNetworkID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredNetwork_has_configuredMachine',
				key: 'configuredNetwork_configuredNetworkID'
			}
		},
		configuredNetworkMachine_configuredMachineID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredNetworkMachine_providesNetworkServiceID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'networkService',
				key: 'networkServiceID'
			}
		},
		servicePortExposed: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, {sequelize, tableName: 'configuredNetwork_providesNetworkService'});
	ConfiguredNetworkMachineProvidesNetworkService.associate = models => {

		models.ConfiguredNetworkMachineProvidesNetworkService.hasOne(
			models.ConfiguredNetworkHasConfiguredMachine,
			{ foreignKey: 'configuredNetwork_configuredNetworkID' });
		models.ConfiguredNetworkMachineProvidesNetworkService.hasOne(
			models.NetworkService, { foreignKey: 'networkServiceID'});
	};
	return ConfiguredNetworkMachineProvidesNetworkService;
};
