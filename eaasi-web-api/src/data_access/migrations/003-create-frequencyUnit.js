'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('frequencyUnit', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			frequencyUnitLabel: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			frequencyUnitQID: {
				type: Sq.STRING,
				allowNull: false,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('frequencyUnit');
	}
};
