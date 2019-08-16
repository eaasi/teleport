'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectIsManifestationOfSoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectIsManifestationOfSoftwareVersion.init({
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
	SoftwareObjectIsManifestationOfSoftwareVersion.associate = models => {
		models.SoftwareObjectIsManifestationOfSoftwareVersion.hasOne( models.SoftwareObject, {foreignKey: 'softwareObjectID'});
		models.SoftwareObjectIsManifestationOfSoftwareVersion.hasOne( models.SoftwareVersion, {foreignKey: 'softwareVersion'});
	};
	return SoftwareObjectIsManifestationOfSoftwareVersion;
};
