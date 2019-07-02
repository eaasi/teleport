const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareProduct', {
			softwareProductID: {
				type: Sq.INTEGER,
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
