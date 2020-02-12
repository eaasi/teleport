'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eaasi_role', {
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			roleName: {
				type: Sq.STRING(32),
				allowNull: false,
				columnName: 'role_name',
				unique: true,
			},
			roleDescription: {
				type: Sq.STRING(800),
				allowNull: false,
				columnName: 'role_description'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eaasi_role');
	}
};
