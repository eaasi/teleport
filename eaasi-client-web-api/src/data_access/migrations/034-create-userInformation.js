const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('userInformation', {
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
				type: Sequelize.STRING,
				allowNull: true
			},
			admin: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('userInformation');
	}
};
