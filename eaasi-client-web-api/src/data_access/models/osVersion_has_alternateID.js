'use strict';

const Sequelize = require('sequelize');

class OsVersionHasAlternateID extends Sequelize.Model {}
	module.exports = (sequelize) => {
	OsVersionHasAlternateID.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_alternativeID: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'osVersion_has_alternateID' });
	OsVersionHasAlternateID.associate = models => {
		models.OsVersionHasAlternateID.hasOne(models.OsVersion, {foreignKey: 'osVersionID'})
	}

	return OsVersionHasAlternateID;
};
