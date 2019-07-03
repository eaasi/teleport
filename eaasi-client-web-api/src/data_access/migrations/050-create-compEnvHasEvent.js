const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('computingEnvironment_has_event', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			computingEnvironment_computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			},
			event_eventID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('computingEnvironment_has_event');
	}
};
