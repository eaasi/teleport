'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayInterface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayInterfaceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			displayInterfaceLabel: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayInterface');
	}
};
