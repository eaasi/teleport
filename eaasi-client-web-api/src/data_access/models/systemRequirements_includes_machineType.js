'use strict';

import {SystemRequirements} from './systemRequirements';
import {MachineType} from './machineType';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesMachineType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_machineTypeID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'machineType',
					key: 'machineTypeID'
				}
			}
		}, { sequelize, tableName: 'systemRequirements_includes_machineType' });
	};

	static associate(models) {
		SystemRequirementsIncludesMachineType.hasOne(SystemRequirements, {foreignKey: 'systemRequirementsID'});
		SystemRequirementsIncludesMachineType.hasOne(MachineType, {foreignKey: 'machineTypeID'});
	}
}

module.exports = {
	SystemRequirementsIncludesMachineType : SystemRequirementsIncludesMachineType
};
