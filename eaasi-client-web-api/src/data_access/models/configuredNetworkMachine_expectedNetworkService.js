'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkMachineExpectedNetworkService extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetworkMachineExpectedNetworkService.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredNetworkMachine_configuredNetworkID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredNetworkMachine_configuredMachineID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredNetwork_has_configuredMachine',
				key: 'configuredNetwork_machineID'
			}
		},
		configuredNetworkMachine_expectedNetworkServiceID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'networkService',
				key: 'networkServiceID'
			}
		},
		servicePortExpected: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredNetworkMachine_expectedNetworkService' });

	ConfiguredNetworkMachineExpectedNetworkService.associate = models => {
		models.ConfiguredNetworkMachineExpectedNetworkService.hasOne(
			models.ConfiguredNetworkHasConfiguredMachine,
			{ foreignKey: 'configuredNetwork_has_configuredMachine' });
		models.ConfiguredNetworkMachineExpectedNetworkService.hasOne(
			models.NetworkService,
			{ foreignKey: 'networkServiceID' });
	};

	return ConfiguredNetworkMachineExpectedNetworkService;
};

