'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('programming_language', {
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true,
			},
			label: {
				type: Sq.STRING(64),
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('programming_language');
	}
};
