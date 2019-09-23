'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasAlternateID extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasAlternateID.init({
		createdAt: Sq.DATE,
		updatedAt: Sq.DATE,
		softwareVersion_softwareVersionID: {
			type: Sq.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_alternateID: {
			type: Sq.STRING,
			allowNull: false,
			unique: true
		},
		softwareVersion_idSource: {
			type: Sq.STRING,
			allowNull: false
		},
		softwareVersion_localID: {
			type: Sq.BOOLEAN,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareVersion_has_alternateName' });
	SoftwareVersionHasAlternateID.associate = models => {
		models.SoftwareVersionHasAlternateID.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return SoftwareVersionHasAlternateID;
};
