'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('File.ts', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			fileLocation: {
				type: Sq.STRING,
				allowNull: true
			},
			fileName: {
				type: Sq.STRING,
				allowNull: true
			},
			fileChecksum: {
				type: Sq.STRING,
				allowNull: true
			},
			fileFormat: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'fileFormat',
					key: 'fileFormatID'
				}
			},
			fileSize: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('File.ts');
	}
};
