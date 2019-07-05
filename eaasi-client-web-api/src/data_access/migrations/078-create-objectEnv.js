const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('objectEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			objectEnvironment_objectEnvironment_computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			},
			objectEnvironment_objectEnvironment_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			objectEnvironment_concurrentInstances: {
				type: Sq.INTEGER,
				allowNull: false
			},
			objectEnvironmentName: {
				type: Sq.STRING,
				allowNull: false
			},
			objectEnvironmentDescription: {
				type: Sq.STRING,
				allowNull: false
			},
			objectEnvironmentHelpText: {
				type: Sq.TEXT,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('objectEnvironment');
	}
};

