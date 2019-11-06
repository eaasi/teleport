'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('cpu_architecture', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: false,
			},
			label: {
				type: Sq.STRING(64),
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('cpu_architecture');
	}
};
