'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject_has_objectFile', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObjectFileID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'File.ts',
					key: 'fileID'
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
		return queryInterface.dropTable('softwareObject_has_objectFile');
	}
};
