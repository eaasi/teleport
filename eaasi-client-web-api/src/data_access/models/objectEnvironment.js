'use strict';

import {DigitalObject} from './digitalObject';
import {ComputingEnvironment} from './computingEnvironment';

const Sequelize = require('sequelize');

class ObjectEnvironment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			objectEnvironment_objectEnvironment_computingEnvironmentID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'computingEnvironment',
					key: 'computingEnvironmentID'
				}
			},
			objectEnvironment_objectEnvironment_digitalObjectID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			objectEnvironment_concurrentInstances: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			objectEnvironmentName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			objectEnvironmentDescription: {
				type: Sequelize.STRING,
				allowNull: true
			},
			objectEnvironmentHelpText: {
				type: Sequelize.TEXT,
				allowNull: true
			}
		}, { sequelize, tableName: 'objectEnvironment' });
	};

	static associate(models) {
		ObjectEnvironment.hasOne(DigitalObject, {foreignKey: 'digitalObjectID'});
		ObjectEnvironment.hasOne(ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	}
};

module.exports = {
	ObjectEnvironment: ObjectEnvironment
};
