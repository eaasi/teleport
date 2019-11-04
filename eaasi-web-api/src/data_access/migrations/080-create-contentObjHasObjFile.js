'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject_has_objectFile', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'contentObject',
					key: 'contentObjectLocalID'
				}
			},
			contentObjectFileID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'File.ts',
					key: 'fileID'
				}
			},
			contentObjectFileLabel: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectFile_mediaTypeName: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectFile_order: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObject_has_objectFile');
	}
};
