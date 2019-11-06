'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_developer', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.STRING,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			softwareVersion_softwareDeveloperID: {
				type: Sq.INTEGER,
				references: {
					model: 'developer',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_developer');

	}
};
