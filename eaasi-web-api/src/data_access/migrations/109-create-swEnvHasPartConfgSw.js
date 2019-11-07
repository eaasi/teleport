'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_environment_has_part_configured_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_environment',
					key: 'id'
				}
			},
			configuredSoftwareID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'configured_software',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_environment_has_part_configured_software');
	}
};
