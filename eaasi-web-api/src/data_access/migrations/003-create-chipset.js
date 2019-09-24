'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('chipset', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			chipsetID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			chipsetQID: {
				type: Sq.STRING,
				allowNull: false,
			},
			chipsetLabel: {
				type: Sq.STRING(64),
				allowNull: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('chipset');
	}
};
