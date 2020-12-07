'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('region', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			qid: {
				type: Sq.STRING(64),
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: Sq.STRING(64),
				allowNull: false
			},
			iso31661_numericCode: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('region');
	}
};
