'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('system_requirements', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
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
				allowNull: false,
				defaultValue: false
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
		const query = 'DROP TABLE IF EXISTS system_requirements CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
