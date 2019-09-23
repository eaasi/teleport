'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			requirementsSummary: {
				type: Sq.TEXT,
				allowNull: true
			},
			minimumRAM: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumRAM_unitName: {
				type: Sq.STRING,
				allowNull: true
			},
			minimumDiskVolume: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumDiskVolume_unitName: {
				type: Sq.STRING,
				allowNull: true
			},
			minimumColorDepth: {
				type: Sq.STRING,
				allowNull: true,
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
			minimumNetworkBitRate: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumNetworkBitRate_unitName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements');
	}
};
