'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			osVersionQID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			osVersionName: {
				type: Sq.STRING,
				allowNull: true
			},
			osVersionDescription: {
				type: Sq.STRING,
				allowNull: true
			},
			osVersionNumber: {
				type: Sq.STRING,
				allowNull: true
			},
			osVersionPublicationDate: {
				type: Sq.DATE,
				allowNull: true
			},
			osVersionSystemRequirements: {
				type: Sq.INTEGER,
				allowNull: false
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
