const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredSoftware_uses_formatImplementation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftware_configuredSoftwareManifestationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			},
			configuredSoftware_formatImplementation: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'formatImplementation',
					key: 'formatImplementationID'
				}
			},
			configuredFormatOperation: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'formatOperation',
					key: 'operationID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredSoftware_uses_formatImplementation');
	}
};
