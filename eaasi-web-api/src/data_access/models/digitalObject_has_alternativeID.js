'use strict';

const Sequelize = require('sequelize');

class DigitalObjectHasAlternativeID extends Sequelize.Model {}
module.exports = (sequelize) => {
	DigitalObjectHasAlternativeID.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		digitalObject_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		alternativeID_alternativeID: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'digitalObject_has_alternativeID' });
	DigitalObjectHasAlternativeID.associate = models => {
		models.DigitalObjectHasAlternativeID.hasOne(models.DigitalObject, {foreignKey: 'digitalObjectID'});
	};
	return DigitalObjectHasAlternativeID;
};
