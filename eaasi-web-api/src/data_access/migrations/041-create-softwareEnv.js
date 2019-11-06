'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_environment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sq.STRING,
				allowNull: true
			},
			description: {
				type: Sq.STRING,
				allowNull: true
			},
			helpText: {
				type: Sq.TEXT,
				allowNull: true
			},
			derivedFrom_softwareEnvironment: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_environment',
					key: 'id'
				}
			},
			hasPart_configuredOS: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_os',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_environment');
	}
};
