const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredNetwork', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			configuredNetworkName: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredNetworkDescription: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredNetwork');
	}
};
