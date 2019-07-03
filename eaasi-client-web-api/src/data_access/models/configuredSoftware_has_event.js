'use strict';

import {ConfiguredSoftware} from './configuredSoftware';

const Sequelize = require('sequelize');

class ConfiguredSoftwareHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ConfiguredSoftwareHasEvent.hasOne(ConfiguredSoftware, {foreignKey: 'configuredSoftwareVersionID'});
	}
};

module.exports = {
	ConfiguredSoftwareHasEvent: ConfiguredSoftwareHasEvent
};
