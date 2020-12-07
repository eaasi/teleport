'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('country', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			qid: {
				type: Sq.STRING(64),
				primaryKey: true,
			},
			label: {
				type: Sq.STRING(64),
			},
			iso31661_numeric_code: {
				type: Sq.STRING(32),
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('country');
	}
};
