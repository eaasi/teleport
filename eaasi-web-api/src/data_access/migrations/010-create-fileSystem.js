'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileSystem', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileSystemID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			fileSystemQID: {
				type: Sq.STRING,
				allowNull: true,
			},
			fileSystemLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileSystem');
	}
};
