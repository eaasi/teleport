'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_network_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			systemRequirements_networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'network_device',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements_requires_network_device');
	}
};
