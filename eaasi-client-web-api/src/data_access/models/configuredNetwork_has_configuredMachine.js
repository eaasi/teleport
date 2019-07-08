'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkHasConfiguredMachine extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetworkHasConfiguredMachine.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredNetwork_configuredNetworkID: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'configuredNetwork',
					key: 'configuredNetworkID'
				}
			},
			configuredNetwork_machineID: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			},
			bootOrder: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			staticIpAddress: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredNetwork_has_configuredMachine' });
	ConfiguredNetworkHasConfiguredMachine.associate = models => {

		models.ConfiguredNetworkHasConfiguredMachine.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		models.ConfiguredNetworkHasConfiguredMachine.hasOne(models.ConfiguredNetwork, {foreignKey: 'configuredNetworkID'});
	};

	return ConfiguredNetworkHasConfiguredMachine;
};
