'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user_information', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			userInformationID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: Sq.STRING,
				allowNull: true
			},
			password: {
				type: Sq.STRING,
				allowNull: true
			},
			organization: {
				type: Sq.STRING,
				allowNull: true
			},
			admin: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user_information');
	}
};
