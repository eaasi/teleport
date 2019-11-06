'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_has_object_file', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			softwareObjectFileID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'file',
					key: 'id'
				}
			},
			softwareObjectFileLabel: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObjectFile_mediaTypeName: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObjectFile_order: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object_has_object_file');
	}
};
