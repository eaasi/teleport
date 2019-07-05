const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_isCompatibleWith_configuredMachine', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			compatibleMachineID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_isCompatibleWith_configuredMachine');
	}
};
