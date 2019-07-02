'use strict';

import {DigitalObject} from './digitalObject';
import {SoftwareObject} from './softwareObject';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class ConfiguredSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredSoftwareVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			executableLocation: {
				type: Sequelize.STRING,
				allowNull: true
			},
			executableSyntax: {
				type: Sequelize.STRING,
				allowNull: true
			},
			saveLocation: {
				type: Sequelize.STRING,
				allowNull: true
			},
			configuredLanguage: {
				type: Sequelize.INTEGER,
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
			hasSource_digitalObjectID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			manifestationOf_softwareVersion: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'configuredSoftware' });
	};

	static associate(models) {
		ConfiguredSoftware.hasOne(DigitalObject, {foreignKey: 'digitalObjectID'});
		ConfiguredSoftware.hasOne(SoftwareObject, {foreignKey: 'softwareObjectID'});
		ConfiguredSoftware.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
}

module.exports = {
	ConfiguredSoftware: ConfiguredSoftware
};
