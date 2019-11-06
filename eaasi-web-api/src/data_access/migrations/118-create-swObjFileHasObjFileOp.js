'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_file_has_object_file_operation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObjectFile_softwareObjectID: {
				type: Sq.STRING,
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
		return queryInterface.dropTable('software_object_file_has_object_file_operation');
	}
};
