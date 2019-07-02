'use strict';

import {Timezone} from './timezone';
import {Region} from './region';
import {ColorDepth} from './colorDepth';
import {SoftwareObject} from './softwareObject';

const Sequelize = require('sequelize');

class ConfiguredOS extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredOperatingSystemID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			configuredDisplayResolution: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			},
			configuredColorDepth: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			},
			configuredRegion: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'region',
					key: 'regionQID'
				}
			},
			configuredTimezone: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'timezone',
					key: 'timezoneQID'
				}
			},
			configuredDateTime: {
				type: Sequelize.DATE,
				allowNull: true
			},
			hasSource_softwareObjectID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			manifestationOf_osVersion: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredOS' });
	};

	static associate(models) {
		ConfiguredOS.hasOne(Timezone, {foreignKey: 'timezoneQID'});
		ConfiguredOS.hasOne(Region, {foreignKey: 'regionQID'});
		ConfiguredOS.hasOne(ColorDepth, {foreignKey: 'colorDepthID'});
		ConfiguredOS.hasOne(SoftwareObject, {foreignKey: 'softwareObjectID'});
	}
}

module.exports = {
	ConfiguredOS: ConfiguredOS
};
