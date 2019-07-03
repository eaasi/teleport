const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredSoftware_has_userInfo', {
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
			userInformation_userInformationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'userInformation',
					key: 'userInformationID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredSoftware_has_userInfo');
	}
};
