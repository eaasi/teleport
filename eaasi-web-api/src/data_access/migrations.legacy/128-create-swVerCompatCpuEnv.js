'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_compatible_with_computing_environment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			computingEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'computing_environment',
					key: 'id'
				}
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('software_version_is_compatible_with_computing_environment');
		return queryInterface.dropTable('software_version_compatible_with_computing_environment');
	}
};
