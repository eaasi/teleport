'use strict';

import {SoftwareObject} from './softwareObject';

const Sequelize = require('sequelize');

class SoftwareObjectHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
			event_eventID: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SoftwareObjectHasEvent.hasOne(SoftwareObject, {foreignKey: 'softwareObjectID'});
	}
}

module.exports = {
	SoftwareObject: SoftwareObjectHasEvent
};
