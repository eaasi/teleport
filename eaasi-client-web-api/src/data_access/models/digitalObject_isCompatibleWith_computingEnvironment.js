'use strict';

const Sequelize = require('sequelize');

class DigitalObjectIsCompatibleWithComputingEnvironment extends Sequelize.Model {}
module.exports = (sequelize) => {
	DigitalObjectIsCompatibleWithComputingEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		digitalObject_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		compatibleComputingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'computingEnvironment',
				key: 'computingEnvironmentID'
			}
		}
	}, { sequelize, tableName: 'digitalObject_isCompatibleWith_computingEnvironment' });
	DigitalObjectIsCompatibleWithComputingEnvironment.associate = models => {
		models.DigitalObjectIsCompatibleWithComputingEnvironment.hasOne(models.DigitalObject, {foreignKey: 'digitalObjectID'});
		models.DigitalObjectIsCompatibleWithComputingEnvironment.hasOne(models.ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	};
	return DigitalObjectIsCompatibleWithComputingEnvironment;
};
