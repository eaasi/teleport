'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_network_emulates_network_service', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredNetworkID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_network',
					key: 'id'
				}
			},
			networkServiceID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'network_service',
					key: 'id'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_network_emulates_network_service');
	}
};
