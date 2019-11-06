'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object_has_event');
	}
};
