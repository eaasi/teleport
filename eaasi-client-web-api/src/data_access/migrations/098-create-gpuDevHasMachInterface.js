'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('gpuDevice_has_machineInterface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			gpuDevice_gpuDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'gpuDevice',
					key: 'gpuDeviceID'
				}
			},
			gpuDevice_machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('gpuDevice_has_machineInterface');
	}
};
