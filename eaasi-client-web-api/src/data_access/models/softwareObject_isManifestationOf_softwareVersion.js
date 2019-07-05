'use strict';

import {SoftwareVersion} from './softwareVersion';
import {SoftwareObject} from './softwareObject';

const Sequelize = require('sequelize');

class SoftwareObjectIsManifestationOfSoftwareVersion extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareObject_softwareObjectID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObject_softwareVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'softwareObject_isManifestationOf_softwareVersion' });
	};

	static associate(models) {
		SoftwareObjectIsManifestationOfSoftwareVersion.hasOne(
			SoftwareObject, {foreignKey: 'softwareObjectID'});
		SoftwareObjectIsManifestationOfSoftwareVersion.hasOne(
			SoftwareVersion, {foreignKey: 'softwareVersion'});
	}
}

module.exports = {
	SoftwareObjectIsManifestationOfSoftwareVersion: SoftwareObjectIsManifestationOfSoftwareVersion
};
