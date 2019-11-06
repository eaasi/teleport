'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_is_compatible_with_configured_machine', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			compatibleMachineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_machine',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_is_compatible_with_configured_machine');
	}
};
