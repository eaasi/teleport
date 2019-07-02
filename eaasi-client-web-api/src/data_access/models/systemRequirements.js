'use strict';

import {DisplayResolution} from './displayResolution';
import {ColorDepth} from './colorDepth';

const Sequelize = require('sequelize');

class SystemRequirements extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			systemRequirementsID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			requirementsSummary: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			minimumRAM: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			minimumDiskSpace: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			minimumColorDepth: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			},
			minimumDisplayResolution: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			},
			internetAccessRequired: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			},
			minimumMbps: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'systemRequirements' });
	};

	static associate(models) {
		SystemRequirements.hasOne(DisplayResolution, {foreignKey: 'displayResolutionID'});
		SystemRequirements.hasOne(ColorDepth, {foreignKey: 'colorDepthID'});
	}
};

module.exports = {
	SystemRequirements: SystemRequirements
};
