'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_storageDeviceType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_requiresStorageDeviceTypeID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'storageDeviceType',
					key: 'storageDeviceTypeID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements_requires_storageDeviceType');
	}
};
