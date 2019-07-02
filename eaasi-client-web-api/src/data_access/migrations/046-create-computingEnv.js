const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('computingEnvironment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			computingEnvironment_hasSourceOrg: {
				type: Sq.INTEGER,
				allowNull: true
			},
			computingEnvironment_inNetwork: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
			computingEnvironment_configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredNetwork',
					key: 'configuredNetworkID'
				}
			},
			computingEnvironment_softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('computingEnvironment');
	}
};
