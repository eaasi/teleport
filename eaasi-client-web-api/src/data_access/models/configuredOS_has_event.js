'use strict';

import {ConfiguredOS} from './configuredOS';

const Sequelize = require('sequelize');

class ConfiguredOsHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ConfiguredOsHasEvent.hasOne(ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
	}
};

module.exports = {
	ConfiguredOsHasEvent: ConfiguredOsHasEvent
};
