'use strict';

const Sequelize = require('sequelize');

class OsVersionHasSoftwareLicense extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionHasSoftwareLicense.init({
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
		osVersion_softwareLicenseQID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareLicense',
				key: 'softwareLicenseQID'
			}
		}
	}, { sequelize, tableName: 'osVersion_has_softwareLicense' });
	OsVersionHasSoftwareLicense.associate = models => {
		models.OsVersionHasSoftwareLicense.hasOne(models.OsVersion, {foreignKey: 'osVersionID'})
		models.OsVersionHasSoftwareLicense.hasOne(models.SoftwareLicense, {foreignKey: 'softwareLicenseID'})
	}
	return OsVersionHasSoftwareLicense;
};
