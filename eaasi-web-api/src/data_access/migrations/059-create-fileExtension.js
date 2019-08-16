'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileExtension', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			extension: {
				type: Sq.STRING,
				allowNull: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileExtension');
	}
};
