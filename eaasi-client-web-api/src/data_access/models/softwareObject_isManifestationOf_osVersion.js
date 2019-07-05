'use strict';

import {SoftwareObject} from './softwareObject';
import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class SoftwareObjectIsManifestationOfOsVersion extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareObject_softwareObjectID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObject_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SoftwareObjectIsManifestationOfOsVersion.hasOne(
			 SoftwareObject, {foreignKey: 'softwareObjectID'});
		SoftwareObjectIsManifestationOfOsVersion.hasOne(
			OsVersion, {foreignKey: 'osVersionID'});
	}
}

module.exports = {
	SoftwareObjectIsManifestationOfOsVersion: SoftwareObjectIsManifestationOfOsVersion
};
