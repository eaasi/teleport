'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareFamilyVersion_has_softwareVersion', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareFamilyVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			hasPart_softwareVersion: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareFamilyVersion_has_softwareVersion');
	}
};
