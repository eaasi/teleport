'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Country.ts', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			countryQID: {
				type: Sq.STRING,
				primaryKey: true,
			},
			countryLabel: {
				type: Sq.STRING,
			},
			iso31661_numericCode: {
				type: Sq.STRING,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Country.ts');
	}
};
