'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_developer', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_softwareDeveloperQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'developer',
					key: 'developerQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_has_developer');

	}
};
