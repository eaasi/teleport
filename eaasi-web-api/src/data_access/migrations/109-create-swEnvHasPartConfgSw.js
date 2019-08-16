'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareEnvironment_hasPart_configuredSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironment_softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			},
			hasConfiguredSoftware: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareEnvironment_hasPart_configuredSoftware');
	}
};
