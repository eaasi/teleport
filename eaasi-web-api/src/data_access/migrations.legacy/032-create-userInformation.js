'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user_information', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.STRING(50),
				allowNull: false,
				primaryKey: true
			},
			username: {
				type: Sq.STRING(64),
				allowNull: true
			},
			password: {
				type: Sq.STRING(128),
				allowNull: true
			},
			organization: {
				type: Sq.STRING(128),
				allowNull: true
			},
			isAdmin: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_information');
	}
};
