'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('computing_environment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			sourceOrg: {
				type: Sq.INTEGER,
				allowNull: true
			},
			isInNetwork: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
			configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_network',
					key: 'id'
				}
			},
			computingEnvironment_softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_environment',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS computing_environment CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
