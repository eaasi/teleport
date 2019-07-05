'use strict';

import {OsVersion} from './osVersion';
import {ConfiguredMachine} from './configuredMachine';

const Sequelize = require('sequelize');

class OsVersionIsCompatibleWithConfiguredMachine extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersion_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			compatibleMachineID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredMachine',
					key: 'configuredMachineID'
				}
			}
		}, { sequelize, tableName: 'osVersion_isCompatibleWith_configuredMachine' });
	};

	static associate(models) {
		OsVersionIsCompatibleWithConfiguredMachine.hasOne(OsVersion,
			{foreignKey: 'osVersionID'});
		OsVersionIsCompatibleWithConfiguredMachine.hasOne(ConfiguredMachine,
			{foreignKey: 'configuredMachineID'});
	}
};

module.exports = {
	OsVersionIsCompatibleWithConfiguredMachine: OsVersionIsCompatibleWithConfiguredMachine
};
