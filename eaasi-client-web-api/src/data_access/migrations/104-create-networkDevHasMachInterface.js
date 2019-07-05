'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('networkDevice_has_machineInterface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			networkDevice_networkDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'networkDevice',
					key: 'networkDeviceID'
				}
			},
			networkDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('networkDevice_has_machineInterface');
	}
};
