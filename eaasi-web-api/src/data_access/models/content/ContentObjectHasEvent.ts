'use strict';

const Sequelize = require('sequelize');

class ContentObjectHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObject_contentObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'contentObject',
				key: 'contentObjectID'
			}
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentObject_has_event' });
	ContentObjectHasEvent.associate = models => {
		models.ContentObjectHasEvent.hasOne(models.ContentObject, {foreignKey: 'contentObjectID'});
	};
	return ContentObjectHasEvent;
};
