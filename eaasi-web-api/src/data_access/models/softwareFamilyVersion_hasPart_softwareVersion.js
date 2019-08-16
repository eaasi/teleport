'use strict';

const Sequelize = require('sequelize');

class SoftwareFamilyVersionHasPartSoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareFamilyVersionHasPartSoftwareVersion.init({
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
	SoftwareFamilyVersionHasPartSoftwareVersion.associate = models => {
		models.SoftwareFamilyVersionHasPartSoftwareVersion.hasOne(
			models.SoftwareVersion, {foreignKey: 'softwareVersionID', as: 'familyVersionID'});
		models.SoftwareFamilyVersionHasPartSoftwareVersion.hasOne(
			models.SoftwareVersion, {foreignKey: 'softwareVersionID', as: 'hasPartSoftwareVersion'});
	};
	return SoftwareFamilyVersionHasPartSoftwareVersion;
};
