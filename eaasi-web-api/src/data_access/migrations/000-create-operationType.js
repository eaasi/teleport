'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('operationType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			operationTypeLabel: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('operationType');
	}
};
