const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_includes_storageDeviceType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_storageDeviceTypeID: {
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
		return queryInterface.dropTable('systemRequirements_includes_storageDeviceType');
	}
};
