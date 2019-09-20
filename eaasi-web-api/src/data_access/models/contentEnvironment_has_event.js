'use strict';

const Sequelize = require('sequelize');

class ContentEnvironmentHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironmentHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironment_contentEnvironment_computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'contentEnvironment',
				key: 'contentEnvironment_contentEnvironment_computingEnvironmentID'
			}
		},
		contentEnvironment_contentEnvironment_digitalContentID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentEnvironment_has_event' });
	ContentEnvironmentHasEvent.associate = models => {
		models.ContentEnvironmentHasEvent.hasOne(models.ContentEnvironment,
			{foreignKey: 'contentEnvironment_contentEnvironment_computingEnvironmentID'}
		);
	};
	return ContentEnvironmentHasEvent;
};
