'use strict';

import {ConfiguredNetwork} from './configuredNetwork';
import {NetworkService} from './networkService';

const Sequelize = require('sequelize');

class ConfiguredNetworkEmulatesNetworkService extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredNetwork_configuredNetworkID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredNetwork',
					key: 'configuredNetworkID'
				}
			},
			configuredNetwork_networkServiceID: {
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
		}, { sequelize, tableName: 'configuredNetwork_emulatesNetworkService' });
	};

	static associate(models) {
		ConfiguredNetworkEmulatesNetworkService.hasOne(ConfiguredNetwork, {foreignKey: 'configuredNetworkID'});
		ConfiguredNetworkEmulatesNetworkService.hasOne(NetworkService, {foreignKey: 'networkServiceID'});
	}
}

module.exports = {
	ConfiguredNetworkEmulatesNetworkService: ConfiguredNetworkEmulatesNetworkService
};
