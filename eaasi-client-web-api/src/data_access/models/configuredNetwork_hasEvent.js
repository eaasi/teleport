'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkHasEvent extends Sequelize.Model {
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
			event_eventID: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredNetwork' });
	};

	static associate(models) {
	}
};

module.exports = {
	ConfiguredNetworkHasEvent: ConfiguredNetworkHasEvent
};
