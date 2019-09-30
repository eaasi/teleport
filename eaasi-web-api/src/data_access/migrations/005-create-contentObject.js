'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			contentObjectIDSource: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectName: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectProductKey: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectHelpText: {
				type: Sq.TEXT,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObject');
	}
};
