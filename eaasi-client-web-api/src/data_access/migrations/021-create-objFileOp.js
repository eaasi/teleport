const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('objectFileOperation', {
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
		return queryInterface.dropTable('objectFileOperation');
	}
};
