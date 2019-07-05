'use strict';

import {SoftwareEnvironment} from './softwareEnvironment';
import {ConfiguredSoftware} from './configuredSoftware';

const Sequelize = require('sequelize');

class SoftwareEnvironmentHasPartConfiguredSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			}
		}, { sequelize, tableName: 'softwareEnvironment_hasPart_configuredSoftware' });
	};

	static associate(models) {
		SoftwareEnvironmentHasPartConfiguredSoftware.hasOne(
			SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
		SoftwareEnvironmentHasPartConfiguredSoftware.hasOne(
			ConfiguredSoftware, {foreignKey: 'configuredSoftwareID'});
	}
}

module.exports = {
	SoftwareEnvironmentHasPartConfiguredSoftware : SoftwareEnvironmentHasPartConfiguredSoftware
};
