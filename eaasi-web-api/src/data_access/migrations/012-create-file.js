'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			location: {
				type: Sq.STRING(256),
				allowNull: true
			},
			name: {
				type: Sq.STRING(256),
				allowNull: true
			},
			checkSum: {
				type: Sq.STRING(64),
				allowNull: true
			},
			fileFormatID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'file_format',
					key: 'id'
				}
			},
			size: {
				type: Sq.STRING(32),
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file');
	}
};
