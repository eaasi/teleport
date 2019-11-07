'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eaasi_user', {
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
			username: {
				type: Sq.STRING(50),
				allowNull: false,
				columnName: 'username'
			},
			firstName: {
				type: Sq.STRING(50),
				allowNull: true,
				columnName: 'first_name'
			},
			lastName: {
				type: Sq.STRING(50),
				allowNull: true,
				columnName: 'last_name'
			},
			email: {
				type: Sq.STRING(128),
				allowNull: false,
				columnName: 'email'
			},
			roleId: {
				type: Sq.INTEGER,
				allowNull: true,
				columnName: 'role_id',
				references: {
					model: 'eaasi_role',
					key: 'id'
				}
			},
			lastLogin: {
				type: Sq.DATE,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eaasi_user');
	}
};
