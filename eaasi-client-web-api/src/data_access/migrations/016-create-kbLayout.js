const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardLayout', {
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
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
