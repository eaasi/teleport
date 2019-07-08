'use strict';

const Sequelize = require('sequelize');

class ComputingEnvironmentHasEvent extends Sequelize.Model {}

module.exports = (sequelize) => {
	ComputingEnvironmentHasEvent.init({
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

	ComputingEnvironmentHasEvent.associate = models =>{
		models.ComputingEnvironmentHasEvent.hasOne(models.ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	};
};

