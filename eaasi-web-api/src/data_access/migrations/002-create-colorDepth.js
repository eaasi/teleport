'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('color_depth', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			colorDepthID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			colorDepthLabel: {
				type: Sq.STRING(64),
				allowNull: false
			},
			bitDepth: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('color_depth');
	}
};
