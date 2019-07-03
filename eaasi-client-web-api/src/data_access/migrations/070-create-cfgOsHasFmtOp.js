const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredOS_has_formatOperation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredOS_configuredOperatingSystemID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredOS',
					key: 'configuredOperatingSystemID'
				}
			},
			formatOperation_opensFileFormat: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'fileFormat',
					key: 'fileFormatQID'
				}
			},
			formatOperation_usesConfiguredSoftware: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredOS_has_formatOperation');
	}
};
