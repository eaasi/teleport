'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObjectFile_has_objectFileOperation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObjectFile_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectFile_fileID: {
				type: Sq.INTEGER,
				allowNull: true,
			},
			contentObjectFile_operationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'objectFileOperation',
					key: 'operationID'
				}
			},
			contentObjectFile_operationOrder: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObjectFile_has_objectFileOperation');
	}
};
