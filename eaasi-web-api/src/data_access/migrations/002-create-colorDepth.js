'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('colorDepth', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			colorDepthID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			colorDepthName: {
				type: Sq.INTEGER,
				allowNull: false
			},
			bitDepth: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('colorDepth');
	}
};
