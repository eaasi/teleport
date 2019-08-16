'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareFamilyVersion_hasPart_softwareVersion', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareFamilyVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			hasPart_softwareVersion: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareFamilyVersion_hasPart_softwareVersion');
	}
};
