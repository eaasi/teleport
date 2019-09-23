'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject_isManifestationOf_softwareVersion', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObject_softwareVersionID: {
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
		return queryInterface.dropTable('softwareObject_isManifestationOf_softwareVersion');
	}
};
