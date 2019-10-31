'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionIsCompatibleWithComputingEnvironment extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionIsCompatibleWithComputingEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		compatibleComputingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'computingEnvironment',
				key: 'computingEnvironmentID'
			}
		}
	}, { sequelize, tableName: 'softwareVersion_isCompatibleWith_computingEnvironment' });
	SoftwareVersionIsCompatibleWithComputingEnvironment.associate = models => {
		models.SoftwareVersionIsCompatibleWithComputingEnvironment.hasOne(
			models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.SoftwareVersionIsCompatibleWithComputingEnvironment.hasOne(
			models.ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	};

	return SoftwareVersionIsCompatibleWithComputingEnvironment;
};
