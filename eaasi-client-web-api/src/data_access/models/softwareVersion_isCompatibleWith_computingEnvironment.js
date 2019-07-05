'use strict';

import {SoftwareVersion} from './softwareVersion';
import {ComputingEnvironment} from './computingEnvironment';

const Sequelize = require('sequelize');

class SoftwareVersionIsCompatibleWithComputingEnvironment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareVersion_softwareVersionID: {
				type: Sequelize.INTEGER,
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
	};

	static associate(models) {
		SoftwareVersionIsCompatibleWithComputingEnvironment.hasOne(
			SoftwareVersion, {foreignKey: 'softwareVersionID'});
		SoftwareVersionIsCompatibleWithComputingEnvironment.hasOne(
			ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	}
}

module.exports = {
	SoftwareVersionIsCompatibleWithComputingEnvironment : SoftwareVersionIsCompatibleWithComputingEnvironment
};
