'use strict';

import {ConfiguredOS} from './configuredOS';

const Sequelize = require('sequelize');

class SoftwareEnvironment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareEnvironmentID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			softwareEnvironmentName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			softwareEnvironmentDescription: {
				type: Sequelize.STRING,
				allowNull: true
			},
			softwareEnvironmentHelpText: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			derivedFrom_softwareEnvironment: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			},
			softwareEnvironment_hasPart_configuredOS: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredOS',
					key: 'configuredOperatingSystemID'
				}
			}
		}, { sequelize, tableName: 'softwareEnvironment' });
	};

	static associate(models) {
		SoftwareEnvironment.hasOne(ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
		SoftwareEnvironment.hasOne(SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
	}
};

module.exports = {
	SoftwareEnvironment: SoftwareEnvironment
};
