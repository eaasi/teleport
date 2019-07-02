const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileSystem', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileSystemQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			fileSystemName: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileSystem');
	}
};
