'use strict';

const Sequelize = require('sequelize');

class ObjectEnvironmentHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ObjectEnvironmentHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		objectEnvironment_objectEnvironment_computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'objectEnvironment',
				key: 'objectEnvironment_objectEnvironment_computingEnvironmentID'
			}
		},
		objectEnvironment_objectEnvironment_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'objectEnvironment_has_event' });
	ObjectEnvironmentHasEvent.associate = models => {
		models.ObjectEnvironmentHasEvent.hasOne(models.ObjectEnvironment, {foreignKey: 'objectEnvironment_objectEnvironment_computingEnvironmentID'});
	};
	return ObjectEnvironmentHasEvent;
};
