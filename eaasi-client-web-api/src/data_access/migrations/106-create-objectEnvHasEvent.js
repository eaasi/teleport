const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('objectEnvironment_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			objectEnvironment_objectEnvironment_computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'objectEnvironment',
					key: 'objectEnvironment_objectEnvironment_computingEnvironmentID'
				}
			},
			objectEnvironment_objectEnvironment_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('objectEnvironment_has_event');
	}
};












