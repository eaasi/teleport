'use strict';

const Sequelize = require('sequelize');

class ContentObjectHasAlternateID extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectHasAlternateID.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObject_contentObjectLocalID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'contentObject',
				key: 'contentObjectLocalID'
			}
		},
		alternateID_alternateID: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentObject_has_alternateID' });
	ContentObjectHasAlternateID.associate = models => {
		models.ContentObjectHasAlternateID.hasOne(models.ContentObject, {foreignKey: 'contentObjectLocalID'});
	};
	return ContentObjectHasAlternateID;
};
