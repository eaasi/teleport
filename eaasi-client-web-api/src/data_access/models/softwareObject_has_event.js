'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareObject_softwareObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'pointerDevice' });
	SoftwareObjectHasEvent.associate = models => {
		models.SoftwareObjectHasEvent.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
	};
	return SoftwareObjectHasEvent;
};
