'use strict';

import {DigitalObject} from './digitalObject';
import {ComputingEnvironment} from './computingEnvironment';

const Sequelize = require('sequelize');

class DigitalObjectIsCompatibleWithComputingEnvironment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		DigitalObjectIsCompatibleWithComputingEnvironment.hasOne(DigitalObject, {foreignKey: 'digitalObjectID'});
		DigitalObjectIsCompatibleWithComputingEnvironment.hasOne(ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	}
}

module.exports = {
	DigitalObjectIsCompatibleWithComputingEnvironment: DigitalObjectIsCompatibleWithComputingEnvironment
};
