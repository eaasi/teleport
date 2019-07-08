'use strict';

const Sequelize = require('sequelize');

class OsVersionHasDeveloper extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionHasDeveloper.init({
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
		osVersion_developerQID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'developer',
				key: 'developerQID'
			}
		}
	}, { sequelize, tableName: 'osVersion_has_developer' });
	OsVersionHasDeveloper.associate = models => {
		models.OsVersionHasDeveloper.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
		models.OsVersionHasDeveloper.hasOne(models.Developer, {foreignKey: 'developerQID'});
	}
	return OsVersionHasDeveloper;
};
