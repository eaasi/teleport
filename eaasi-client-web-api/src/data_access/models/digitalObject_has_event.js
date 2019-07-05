'use strict';

import {DigitalObject} from './digitalObject';

const Sequelize = require('sequelize');

class DigitalObjectHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			digitalObject_digitalObjectID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			event_eventID: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'digitalObject_has_event' });
	};

	static associate(models) {
		DigitalObjectHasEvent.hasOne(DigitalObject, {foreignKey: 'digitalObjectID'});
	}
}

module.exports = {
	DigitalObjectHasEvent: DigitalObjectHasEvent
};
