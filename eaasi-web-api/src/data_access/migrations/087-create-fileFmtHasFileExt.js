'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileFormat_has_fileExtension', {
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			fileFormat_fileFormatID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'fileFormat',
					key: 'fileFormatID'
				}
			},
			fileExtension_fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'fileExtension',
					key: 'fileExtensionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileFormat_has_fileExtension');
	}
};
