'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			qid: {
				type: Sq.INTEGER,
				allowNull: true
			},
			name: {
				type: Sq.STRING,
				allowNull: true
			},
			description: {
				type: Sq.STRING,
				allowNull: true
			},
			number: {
				type: Sq.STRING,
				allowNull: true
			},
			publicationDate: {
				type: Sq.DATE,
				allowNull: true
			},
			systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			isVersionOf_osProduct: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion');
	}
};
