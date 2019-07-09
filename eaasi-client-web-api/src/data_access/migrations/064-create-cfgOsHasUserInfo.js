'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredOS_has_userInformation', {
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
		return queryInterface.dropTable('configuredOS_has_userInformation');
	}
};
