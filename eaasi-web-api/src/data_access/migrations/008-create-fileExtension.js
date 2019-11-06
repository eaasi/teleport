'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_extension', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			fileExtensionLabel: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_extension');
	}
};
