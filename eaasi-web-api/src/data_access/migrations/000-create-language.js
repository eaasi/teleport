'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('language', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			qid: {
				primaryKey: true,
				type: Sq.STRING(64),
				allowNull: false,
			},
			label: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('language');
	}
};
