'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eaasi_role', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			roleName: {
				type: Sq.STRING,
				allowNull: false,
				columnName: 'role_name',
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eaasi_role');
	}
};
