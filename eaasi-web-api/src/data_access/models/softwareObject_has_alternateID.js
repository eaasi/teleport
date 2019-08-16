'use strict';

const Sequelize = require('sequelize');

class SoftwareObjectHasAlternateID extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareObjectHasAlternateID.init({
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
		softwareObject_alternateID: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'softwareObjectHasAlternateID' });
	SoftwareObjectHasAlternateID.associate = models => {
		models.SoftwareObjectHasAlternateID.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
	};

	return SoftwareObjectHasAlternateID;
};
