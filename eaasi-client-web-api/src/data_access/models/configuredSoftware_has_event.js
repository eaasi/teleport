'use strict';

const Sequelize = require('sequelize');

class ConfiguredSoftwareHasEvent extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredSoftwareHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredSoftware_configuredSoftwareManifestationID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredSoftware',
				key: 'configuredSoftwareVersionID'
			}
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredSoftware_has_event' });
	ConfiguredSoftwareHasEvent.associate = models => {

		models.ConfiguredSoftwareHasEvent.hasOne(models.ConfiguredSoftware, {foreignKey: 'configuredSoftwareVersionID'});
	};
	return ConfiguredSoftwareHasEvent;
};
