'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			isInNetwork: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			hasSourceOrg: {
				type: Sq.INTEGER,
				allowNull: true
			},
			productKey: {
				type: Sq.STRING,
				allowNull: true
			},
			helpText: {
				type: Sq.TEXT,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object');
	}
};
