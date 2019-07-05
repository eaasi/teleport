'use strict';

import {ObjectEnvironment} from './objectEnvironment';

const Sequelize = require('sequelize');

class ObjectEnvironmentHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ObjectEnvironmentHasEvent.hasOne(ObjectEnvironment, {foreignKey: 'objectEnvironment_objectEnvironment_computingEnvironmentID'});
	}
};

module.exports = {
	ObjectEnvironmentHasEvent: ObjectEnvironmentHasEvent
};
