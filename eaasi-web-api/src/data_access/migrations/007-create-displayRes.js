'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayResolution', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayResolutionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayResolutionLabel: {
				type: Sq.STRING,
				allowNull: false
			},
			displayResolutionWidth: {
				type: Sq.INTEGER,
				allowNull: false
			},
			displayResolutionHeight: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayResolution');
	}
};
