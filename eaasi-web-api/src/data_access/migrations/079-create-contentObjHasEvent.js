'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'contentObject',
					key: 'contentObjectLocalID'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('contentObject_has_event');
	}
};
