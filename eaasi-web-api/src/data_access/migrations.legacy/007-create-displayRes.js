'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('display_resolution', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			label: {
				type: Sq.STRING(64),
				allowNull: false
			},
			displayResolutionWidth: {
				type: Sq.INTEGER,
				allowNull: false
			},
			displayResolutionHeight: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS display_resolution CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
