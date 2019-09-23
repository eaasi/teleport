'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject_has_alternateID', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObject_alternateID: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObject_alternateIDSource: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObject_localID: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareObject_has_alternateID');
	}
};
