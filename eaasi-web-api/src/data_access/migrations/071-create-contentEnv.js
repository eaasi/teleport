'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentEnvironment_contentEnvironment_computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			},
			contentEnvironment_contentEnvironment_digitalContentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'digitalContent',
					key: 'digitalContentID'
				}
			},
			contentEnvironment_concurrentInstances: {
				type: Sq.INTEGER,
				allowNull: false
			},
			contentEnvironmentName: {
				type: Sq.STRING,
				allowNull: false
			},
			contentEnvironmentDescription: {
				type: Sq.STRING,
				allowNull: false
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

