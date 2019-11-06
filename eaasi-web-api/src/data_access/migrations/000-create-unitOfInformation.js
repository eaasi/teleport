'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('unit_of_information', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			label: {
				type: Sq.STRING(64),
				allowNull: false,
				primaryKey: true,
			},
			abbreviation: {
				type: Sq.STRING(64),
				allowNull: false,
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('unit_of_information');
	}
};
