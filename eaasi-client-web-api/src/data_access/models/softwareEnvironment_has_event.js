'use strict';

const Sequelize = require('sequelize');

class SoftwareEnvironmentHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareEnvironmentHasEvent.init({
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
	SoftwareEnvironmentHasEvent.associate = models => {
		models.SoftwareEnvironmentHasEvent.hasOne(models.SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
	};
	return SoftwareEnvironmentHasEvent;
}
