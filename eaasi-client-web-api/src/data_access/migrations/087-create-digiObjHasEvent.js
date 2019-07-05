'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('digitalObject_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			digitalObject_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('digitalObject_has_event');
	}
};
