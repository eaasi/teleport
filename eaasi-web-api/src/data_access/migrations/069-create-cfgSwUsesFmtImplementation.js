'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_software_uses_format_implementation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftware_configuredSoftwareManifestationID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'configured_software',
					key: 'id'
				}
			},
			configuredSoftware_formatImplementation: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'format_implementation',
					key: 'id'
				}
			},
			configuredFormatOperation: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'format_operation',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_software_uses_format_implementation');
	}
};
