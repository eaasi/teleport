'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileOperation_nearestFileFormat', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperation_fileOperationID: {
				type: Sq.STRING,
				allowNull: true
			},
			fileOperation_fileFormatID: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileOperation_nearestFileFormat');
	}
};
