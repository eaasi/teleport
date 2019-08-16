'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObjectFile_has_objectFileOperation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObjectFile_softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				// references: {
				// 	model: 'softwareObject_has_objectFile',
				// 	key: 'softwareObjectFileID'
				// }
			},
			softwareObjectFile_fileID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			softwareObjectFile_operationID: {
				type: Sq.INTEGER,
				allowNull: true
			},
			softwareObjectFile_operationOrder: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareObjectFile_has_objectFileOperation');
	}
};
