'use strict'

const Sequelize = require('sequelize');

class OsVersionIncludesSoftwareVersion extends Sequelize.Model {}
	module.exports = (sequelize) => {
	OsVersionIncludesSoftwareVersion.init({
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
		osVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'osVersion_includes_softwareVersion' });
	OsVersionIncludesSoftwareVersion.associate = models => {
		models.OsVersionIncludesSoftwareVersion.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
		models.OsVersionIncludesSoftwareVersion.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return OsVersionIncludesSoftwareVersion;
};
