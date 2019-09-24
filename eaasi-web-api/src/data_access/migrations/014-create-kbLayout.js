'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardLayout', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			keyboardLayoutID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			keyboardLayoutQID: {
				type: Sq.STRING,
				allowNull: false,
			},
			keyboardLayoutLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboardLayout');
	}
};
