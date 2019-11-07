'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_system_requirements', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_system_requirements');

	}
};
