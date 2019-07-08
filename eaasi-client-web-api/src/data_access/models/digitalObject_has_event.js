'use strict';

const Sequelize = require('sequelize');

class DigitalObjectHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	DigitalObjectHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		digitalObject_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'digitalObject_has_event' });
	DigitalObjectHasEvent.associate = models => {
		models.DigitalObjectHasEvent.hasOne(models.DigitalObject, {foreignKey: 'digitalObjectID'});
	};
	return DigitalObjectHasEvent;
};
