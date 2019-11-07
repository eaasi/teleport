'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_developer', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			softwareDeveloperQid: {
				type: Sq.STRING,
				references: {
					model: 'developer',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_developer');

	}
};
