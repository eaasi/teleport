'use strict';

const Sequelize = require('sequelize');

class EventType extends Sequelize.Model {}

module.exports = (sequelize) => {
	EventType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		eventTypeLabel: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
	},
	{
		sequelize,
		tableName: 'eventType'
	});

	return EventType;
};
