'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('event_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			label: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('event_type');
	}
};
