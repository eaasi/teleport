'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareProduct', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareProductID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			softwareProductQID: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareProductName: {
				type: Sq.STRING,
				allowNull: false
			},
			isOperatingSystem: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareProduct');
	}
};
