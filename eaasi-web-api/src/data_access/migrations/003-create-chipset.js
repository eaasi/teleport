'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('chipset', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: false,
			},
			label: {
				type: Sq.STRING(64),
				allowNull: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('chipset');
	}
};
