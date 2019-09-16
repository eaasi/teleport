'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('country', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			countryQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			countryLabel: {
				type: Sq.STRING,
				allowNull: false,
			},
			iso31661_numericCode: {
				type: Sq.INTEGER,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('country');
	}
};

