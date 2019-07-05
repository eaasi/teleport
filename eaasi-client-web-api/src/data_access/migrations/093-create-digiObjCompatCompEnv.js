const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('digitalObject_isCompatibleWith_computingEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			digitalObject_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			compatibleComputingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('digitalObject_isCompatibleWith_computingEnvironment');
	}
};
