'use strict';

const Sequelize = require('sequelize');

class ConfiguredOsHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ConfiguredOsHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredOS_configuredOperatingSystemID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredOS',
				key: 'configuredOperatingSystemID'
			}
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredOsHasEvent' });
	ConfiguredOsHasEvent.associate = models => {
		models.ConfiguredOsHasEvent.hasOne(models.ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
	};
	return ConfiguredOsHasEvent;
};

