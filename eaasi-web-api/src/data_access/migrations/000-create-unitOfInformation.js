'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('unitOfInformation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			unitLabel: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			unitAbbreviation: {
				type: Sq.STRING,
				allowNull: false,
			},
			unitQID: {
				type: Sq.STRING,
				allowNull: true,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('unitOfInformation');
	}
};
