'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('frequency_unit', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			label: {
				type: Sq.STRING(64),
				allowNull: false,
				primaryKey: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: false,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('frequency_unit');
	}
};
