const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('digitalObject_has_objectFile', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			digitalObject_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			digitalObjectFileID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'fileID'
				}
			},
			digitalObjectFileLabel: {
				type: Sq.STRING,
				allowNull: true
			},
			digitalObjectFile_usesMountFormat: {
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
		return queryInterface.dropTable('digitalObject_has_objectFile');
	}
};
