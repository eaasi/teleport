'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkHasConfiguredMachine extends Sequelize.Model {
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
			configuredNetwork_machineID: {
				type: Sequelize.INTEGER,
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
	};

	static associate(models) {
		ConfiguredNetworkHasConfiguredMachine.hasOne(ConfiguredNetworkHasConfiguredMachine, {foreignKey: 'configuredNetworkID'});
	}
};

module.exports = {
	ConfiguredNetworkHasConfiguredMachine: ConfiguredNetworkHasConfiguredMachine
};
