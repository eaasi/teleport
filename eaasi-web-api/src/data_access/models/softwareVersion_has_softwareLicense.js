'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasSoftwareLicense extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasSoftwareLicense.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_softwareLicenseQID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'softwareLicense',
				key: 'softwareLicenseQID'
			}
		}
	}, { sequelize, tableName: 'softwareVersion_has_softwareLicense' });
	SoftwareVersionHasSoftwareLicense.associate = models => {
		models.SoftwareVersionHasSoftwareLicense.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.SoftwareVersionHasSoftwareLicense.hasOne(models.SoftwareLicense, {foreignKey: 'softwareLicenseQID'});
	};

	return SoftwareVersionHasSoftwareLicense;
};

