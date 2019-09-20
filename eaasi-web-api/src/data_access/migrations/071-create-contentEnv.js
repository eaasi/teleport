'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentEnvironmentID: {
				type: Sq.TEXT,
				allowNull: false,
			},
			contentEnvironment_computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			},
			contentEnvironmentHelpText: {
				type: Sq.TEXT,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentEnvironment');
	}
};

