'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirementsID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			requirementsSummary: {
				type: Sq.TEXT,
				allowNull: true
			},
			minimumRAM: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumDiskSpace: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumColorDepth: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			},
			minimumDisplayResolution: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			},
			internetAccessRequired: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
			minimumMbps: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements');
	}
};
