'use strict';

import {SoftwareEnvironment} from './softwareEnvironment';

const Sequelize = require('sequelize');

class SoftwareEnvironmentHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareEnvironment_softwareEnvironmentID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			},
			event_eventID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'softwareEnvironment_has_event' });
	};

	static associate(models) {
		SoftwareEnvironmentHasEvent.hasOne(SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
	}
}

module.exports = {
	SoftwareEnvironmentHasEvent: SoftwareEnvironmentHasEvent
};
