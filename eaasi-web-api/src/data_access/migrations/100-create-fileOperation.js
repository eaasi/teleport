'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileOperation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileOperationID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			fileOperationText: {
				type: Sq.STRING,
				allowNull: true
			},
			associatedMIMEType: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileOperation');
	}
};
