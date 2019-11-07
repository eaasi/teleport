'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eaasi_role', {
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			roleName: {
				type: Sq.STRING(32),
				allowNull: false,
				columnName: 'role_name',
				unique: true,
			},
			roleDescription: {
				type: Sq.STRING(100),
				allowNull: false,
				columnName: 'role_description'
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eaasi_role');
	}
};
