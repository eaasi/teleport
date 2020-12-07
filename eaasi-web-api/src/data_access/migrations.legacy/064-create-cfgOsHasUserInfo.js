'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_os_has_user_information', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredOsID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_os',
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
		return queryInterface.dropTable('configured_os_has_user_information');
	}
};
