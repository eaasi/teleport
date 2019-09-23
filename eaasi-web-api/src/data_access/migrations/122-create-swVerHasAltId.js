'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_alternateID', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_alternateID: {
				type: Sq.STRING,
				allowNull: false,
				unique: true
			},
			softwareVersion_idSource: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareVersion_localID: {
				type: Sq.BOOLEAN,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_has_alternateID');
	}
};
