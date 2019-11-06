'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_is_compatible_with_computing_environment', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			software_version_softwareVersionID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			compatibleComputing_environmentID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'computing_environment',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_is_compatible_with_computing_environment');
	}
};
