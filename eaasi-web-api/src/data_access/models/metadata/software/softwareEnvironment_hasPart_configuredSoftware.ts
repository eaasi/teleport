'use strict';

const Sequelize = require('sequelize');

class SoftwareEnvironmentHasPartConfiguredSoftware extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareEnvironmentHasPartConfiguredSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareEnvironment_softwareEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareEnvironment',
				key: 'softwareEnvironmentID'
			}
		},
		hasConfiguredSoftware: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'configuredSoftware',
				key: 'configuredSoftwareVersionID'
			}
		}
	}, { sequelize, tableName: 'softwareEnvironment_hasPart_configuredSoftware' });
	SoftwareEnvironmentHasPartConfiguredSoftware.associate = models => {
		models.SoftwareEnvironmentHasPartConfiguredSoftware.hasOne(
			models.SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
		models.SoftwareEnvironmentHasPartConfiguredSoftware.hasOne(
			models.ConfiguredSoftware, {foreignKey: 'configuredSoftwareID'});
	};
	return SoftwareEnvironmentHasPartConfiguredSoftware;
};
