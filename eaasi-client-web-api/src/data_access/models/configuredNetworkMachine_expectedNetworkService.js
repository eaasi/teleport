'use strict';

import {ConfiguredNetworkHasConfiguredMachine} from './configuredNetwork_has_configuredMachine';
import {NetworkService} from './networkService';

const Sequelize = require('sequelize');

class ConfiguredNetworkMachineExpectedNetworkService extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ConfiguredNetworkMachineExpectedNetworkService.hasOne(ConfiguredNetworkHasConfiguredMachine,
			{
				foreignKey: 'configuredNetwork_has_configuredMachine'
			});
		ConfiguredNetworkMachineExpectedNetworkService.hasOne(NetworkService,
			{
				foreignKey: 'networkServiceID'
			});
	}
};

module.exports = {
	ConfiguredNetworkMachineExpectedNetworkService: ConfiguredNetworkMachineExpectedNetworkService
};
