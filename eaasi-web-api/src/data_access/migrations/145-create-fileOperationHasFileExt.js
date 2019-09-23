'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileOperation_has_fileExtension', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperation_fileOperationID: {
				type: Sq.STRING,
				allowNull: true
			},
			fileOperation_fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileOperation_has_fileExtension');
	}
};
