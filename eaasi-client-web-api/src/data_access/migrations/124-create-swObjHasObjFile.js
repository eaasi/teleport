const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject_has_objectFile', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObjectFileID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'fileID'
				}
			},
			softwareObjectFileLabel: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObjectFile_usesMountFormat: {
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
		return queryInterface.dropTable('softwareObject_has_objectFile');
	}
};
