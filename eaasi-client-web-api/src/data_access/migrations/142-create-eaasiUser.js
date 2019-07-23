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
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			username: {
				type: Sq.STRING,
				allowNull: false,
				columnName: 'username'
			},
			firstName: {
				type: Sq.STRING,
				allowNull: true,
				columnName: 'first_name'
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
