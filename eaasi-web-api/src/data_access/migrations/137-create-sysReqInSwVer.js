'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements_requires_software_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'system_requirements',
					key: 'id'
				}
			},
			softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements_requires_software_version');
	}
};
