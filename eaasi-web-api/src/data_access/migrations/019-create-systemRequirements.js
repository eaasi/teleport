'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			summary: {
				type: Sq.TEXT,
				allowNull: true
			},
			minimumRAM: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumRAMUnitName: {
				type: Sq.STRING(16),
				allowNull: true
			},
			minimumDiskVolume: {
				type: Sq.INTEGER,
				allowNull: true
			},
			minimumDiskVolumeUnitName: {
				type: Sq.STRING(16),
				allowNull: true
			},
			minimumColorDepthID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'color_depth',
					key: 'id'
				}
			},
			minimumDisplayResolutionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'display_resolution',
					key: 'id'
				}
			},
			isInternetAccessRequired: {
				type: Sq.BOOLEAN,
				allowNull: true
			},
			minimumNetworkBitRate: {
				type: Sq.DECIMAL,
				allowNull: true
			},
			minimumNetworkBitRateUnitName: {
				type: Sq.STRING(16),
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('system_requirements');
	}
};
