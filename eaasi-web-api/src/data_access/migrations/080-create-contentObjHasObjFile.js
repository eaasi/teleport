'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject_has_objectFile', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'contentObject',
					key: 'contentObjectLocalID'
				}
			},
			contentObjectFileID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'fileID'
				}
			},
			contentObjectFileLabel: {
				type: Sq.STRING,
				allowNull: true
			},
			contentObjectFile_usesMountFormat: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'mountFormat',
					key: 'mountFormatQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObject_has_objectFile');
	}
};
