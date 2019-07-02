const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject', {
			softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
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
