'use strict';

import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class SoftwareVFamilyVersionHasPartSoftwareVersion extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareFamilyVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			hasPart_softwareVersion: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'softwareFamilyVersion_hasPart_softwareVersion' });
	};

	static associate(models) {
		SoftwareVFamilyVersionHasPartSoftwareVersion.hasOne(
			SoftwareVersion, {foreignKey: 'softwareVersionID', as: 'familyVersionID'});
		SoftwareVFamilyVersionHasPartSoftwareVersion.hasOne(
			SoftwareVersion, {foreignKey: 'softwareVersionID', as: 'hasPartSoftwareVersion'});
	}
}

module.exports = {
	SoftwareFamilyVersionHasPartSoftwareVersion: SoftwareVFamilyVersionHasPartSoftwareVersion
};
