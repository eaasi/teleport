'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_networkDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_requiresNetworkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'networkDevice',
					key: 'networkDeviceID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements_requires_networkDevice');
	}
};
