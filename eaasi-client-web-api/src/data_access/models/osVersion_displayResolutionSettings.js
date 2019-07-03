'use strict';

import {DisplayResolution} from './displayResolution';
import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionDisplayResolutionSettings extends Sequelize.Model {
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
			osVersion_displayResolutionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			}
		}, { sequelize, tableName: 'osVersion_displayResolutionSettings' });
	};

	static associate(models) {
		OsVersionDisplayResolutionSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
		OsVersionDisplayResolutionSettings.hasOne(DisplayResolution, {foreignKey: 'displayResolutionID'});
	}
};

module.exports = {
	OsVersionDisplayResolutionSettings: OsVersionDisplayResolutionSettings
};
