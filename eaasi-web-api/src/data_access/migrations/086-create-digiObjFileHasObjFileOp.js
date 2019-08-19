'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('digitalObjectFile_has_objectFileOperation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			digitalObjectFile_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			digitalObjectFile_fileID: {
				type: Sq.INTEGER,
				allowNull: true,
				// references: {
				// 	model: 'digitalObject_has_objectFile',
				// 	key: 'digitalObjectFileID'
				// }
			},
			digitalObjectFile_operationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'objectFileOperation',
					key: 'operationID'
				}
			},
			digitalObjectFile_operationOrder: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('digitalObjectFile_has_objectFileOperation');
	}
};
