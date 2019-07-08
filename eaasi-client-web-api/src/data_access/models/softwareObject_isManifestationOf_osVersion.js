'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectIsManifestationOfOsVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectIsManifestationOfOsVersion.init({
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
	}, { sequelize, tableName: 'softwareObject_isManifestationOf_osVersion' });
	SoftwareObjectIsManifestationOfOsVersion.associate = models => {
		models.SoftwareObjectIsManifestationOfOsVersion.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
		models.SoftwareObjectIsManifestationOfOsVersion.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
	};
	return SoftwareObjectIsManifestationOfOsVersion;
};
