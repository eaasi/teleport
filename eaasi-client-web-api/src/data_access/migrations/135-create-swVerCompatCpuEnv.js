const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_isCompatibleWith_computingEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			compatibleComputingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_isCompatibleWith_computingEnvironment');
	}
};
