const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboardLayout', {
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
