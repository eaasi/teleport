'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObjectID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			softwareObject_inNetwork: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			softwareObject_hasSourceOrg: {
				type: Sq.INTEGER,
				allowNull: true
			},
			softwareObjectProductKey: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObjectHelpText: {
				type: Sq.TEXT,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareObject');
	}
};
