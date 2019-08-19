'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkHasEvent extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetworkHasEvent.init({
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
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredNetwork' });
	ConfiguredNetworkHasEvent.associate = models => {
		models.ConfiguredNetworkHasEvent.hasOne(models.ConfiguredNetwork, {foreignKey: 'configuredNetworkID'});
	};
	return ConfiguredNetworkHasEvent;
};
