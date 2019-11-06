'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_storage_device_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			systemRequirements_storageDeviceTypeID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'storage_device_type',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements_requires_storage_device_type');
	}
};
