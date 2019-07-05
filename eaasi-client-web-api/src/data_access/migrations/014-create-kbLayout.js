'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardLayout', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			keyboardLayoutQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			keyboardLayoutName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboardLayout');
	}
};
