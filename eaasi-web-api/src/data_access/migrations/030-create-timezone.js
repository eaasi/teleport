'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezone', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			qid: {
				type: Sq.STRING(64),
				allowNull: false,
				primaryKey: true
			},
			utcOffset: {
				type: Sq.STRING(64),
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('timezone');
	}
};
