'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileExtension', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			formatImplementationID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			formatImplementationName: {
				type: Sq.STRING,
				allowNull: false
			},
			implementationExtension: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'fileExtension',
					key: 'fileExtensionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileExtension');
	}
};
