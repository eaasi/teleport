'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('object_file_operation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			operationID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			operationName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('object_file_operation');
	}
};
