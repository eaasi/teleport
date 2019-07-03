'use strict';

import {NetworkService} from './networkService';
import {ConfiguredNetworkHasConfiguredMachine} from './configuredNetwork_has_configuredMachine';

const Sequelize = require('sequelize');

class ConfiguredNetworkMachineProvidesNetworkService extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
		}, { sequelize, tableName: 'configuredNetwork_providesNetworkService' });
	};

	static associate(models) {
		ConfiguredNetworkMachineProvidesNetworkService.hasOne(ConfiguredNetworkHasConfiguredMachine,
			{
				foreignKey: 'configuredNetwork_configuredNetworkID'
			});
		ConfiguredNetworkMachineProvidesNetworkService.hasOne(NetworkService,
			{
				foreignKey: 'networkServiceID'
			});
	}
};

module.exports = {
	ConfiguredNetworkMachineProvidesNetworkService: ConfiguredNetworkMachineProvidesNetworkService
};
