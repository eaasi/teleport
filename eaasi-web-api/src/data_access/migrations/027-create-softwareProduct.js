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
				autoIncrement: true
			},
			softwareProductQID: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareProductDescription: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareProductName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareProduct');
	}
};
