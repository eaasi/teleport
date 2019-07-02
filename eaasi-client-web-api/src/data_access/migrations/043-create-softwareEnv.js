const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			softwareEnvironmentName: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareEnvironmentDescription: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareEnvironmentHelpText: {
				type: Sq.TEXT,
				allowNull: true
			},
			derivedFrom_softwareEnvironment: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			},
			softwareEnvironment_hasPart_configuredOS: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredOS',
					key: 'configuredOperatingSystemID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareEnvironment');
	}
};
