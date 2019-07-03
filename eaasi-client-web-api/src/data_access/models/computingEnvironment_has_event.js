'use strict';

import {ComputingEnvironment} from './computingEnvironment';

const Sequelize = require('sequelize');

class ComputingEnvironmentHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			computingEnvironment_computingEnvironmentID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			},
			event_eventID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'computingEnvironment_has_event' });
	};

	static associate(models) {
		ComputingEnvironmentHasEvent.hasOne(ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	}
}

module.exports = {
	ComputingEnvironmentHasEvent: ComputingEnvironmentHasEvent
};
