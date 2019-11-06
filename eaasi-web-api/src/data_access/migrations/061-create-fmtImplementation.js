'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('format_implementation', {
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
					model: 'file_extension',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('format_implementation');
	}
};
