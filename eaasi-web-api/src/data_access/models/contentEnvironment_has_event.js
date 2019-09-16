'use strict';

const Sequelize = require('sequelize');

class ContentEnvironmentHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironmentHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironment_computingEnvironmentID: Sequelize.STRING,
		contentEnvironment_contentObjectLocalID: Sequelize.STRING,
		contentEnvironment_eventID: Sequelize.STRING,
	}, { sequelize, tableName: 'contentEnvironment_has_event' });
	return ContentEnvironmentHasEvent;
};
