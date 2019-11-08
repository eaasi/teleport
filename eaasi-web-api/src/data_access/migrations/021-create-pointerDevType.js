'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointer_device_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			label: {
				type: Sq.STRING,
				allowNull: false
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('pointer_device_type');
	}
};
