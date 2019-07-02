const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
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
					key: 'fileFormatQID'
				}
			},
			fileSize: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file');
	}
};
