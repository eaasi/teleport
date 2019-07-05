'use strict';

import {ColorDepth} from './colorDepth';
import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionColorDepthSettings extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersion_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_colorDepthID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			}
		}, { sequelize, tableName: 'osVersion_colorDepthSettings' });
	};

	static associate(models) {
		OsVersionColorDepthSettings.hasOne(ColorDepth, {foreignKey: 'colorDepthID'});
		OsVersionColorDepthSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
	}
};

module.exports = {
	OsVersionColorDepthSettings: OsVersionColorDepthSettings
};
