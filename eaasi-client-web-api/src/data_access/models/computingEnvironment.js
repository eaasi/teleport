'use strict';

import {SoftwareEnvironment} from './softwareEnvironment';
import {ConfiguredNetwork} from './configuredNetwork';

const Sequelize = require('sequelize');

class ComputingEnvironment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			computingEnvironmentID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			computingEnvironment_hasSourceOrg: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			computingEnvironment_inNetwork: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			},
			computingEnvironment_configuredNetworkID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredNetwork',
					key: 'configuredNetworkID'
				}
			},
			computingEnvironment_softwareEnvironmentID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareEnvironment',
					key: 'softwareEnvironmentID'
				}
			}
		}, { sequelize, tableName: 'computingEnvironment' });
	};

	static associate(models) {
		ComputingEnvironment.hasOne(SoftwareEnvironment, {foreignKey: 'softwareEnvironment'});
		ComputingEnvironment.hasOne(ConfiguredNetwork, {foreignKey: 'configuredNetworkID'});
	}
}

module.exports = {
	ComputingEnvironment: ComputingEnvironment
};
