'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('content_object_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'content_object',
					key: 'id'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('content_object_has_event');
	}
};
