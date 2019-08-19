'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasAlternateID extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasAlternateID.init({
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
		softwareVersion_alternateID: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareVersion_has_alternateID' });
	SoftwareVersionHasAlternateID.associate = models => {
		models.SoftwareVersionHasAlternateID.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return SoftwareVersionHasAlternateID;
};
