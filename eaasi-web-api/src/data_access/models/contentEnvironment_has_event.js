'use strict';

const Sequelize = require('sequelize');

class ContentEnvironmentHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironmentHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironment_computingEnvironmentID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'contentEnvironment',
				key: 'contentEnvironment_computingEnvironmentID'
			}
		},
		contentEnvironment_contentObjectID: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		contentEnvironment_eventID: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentEnvironment_has_event' });
	return ContentEnvironmentHasEvent;
};
