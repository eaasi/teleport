'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkEmulatesNetworkService extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetworkEmulatesNetworkService.init({
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
	ConfiguredNetworkEmulatesNetworkService.associate = models => {
		models.ConfiguredNetworkEmulatesNetworkService.hasOne(models.ConfiguredNetwork, {foreignKey: 'configuredNetworkID'});
		models.ConfiguredNetworkEmulatesNetworkService.hasOne(models.NetworkService, {foreignKey: 'networkServiceID'});
	};
	return ConfiguredNetworkEmulatesNetworkService;
};
