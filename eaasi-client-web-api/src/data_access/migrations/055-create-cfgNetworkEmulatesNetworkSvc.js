const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredNetwork_emulatesNetworkService', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetwork_configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredNetwork',
					key: 'configuredNetworkID'
				}
			},
			configuredNetwork_networkServiceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'networkService',
					key: 'networkServiceID'
				}
			},
			servicePortExposed: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredNetwork_emulatesNetworkService');
	}
};
