'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_software_has_user_information', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftwareID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_software',
					key: 'id'
				}
			},
			userInformationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'user_information',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_software_has_user_information');
	}
};
