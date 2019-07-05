'use strict';

import {SystemRequirements} from './systemRequirements';
import {CpuArchitecture} from './cpuArchitecture';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesCpuArchitecture extends Sequelize.Model {
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
			systemRequirements_cpuArchitecture: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'cpuArchitecture',
					key: 'cpuArchitectureQID'
				}
			}
		}, { sequelize, tableName: 'systemRequirements_includes_cpuArchitecture' });
	};

	static associate(models) {
		SystemRequirementsIncludesCpuArchitecture.hasOne(
			SystemRequirements, {foreignKey: 'systemRequirementsID'});
		SystemRequirementsIncludesCpuArchitecture.hasOne(
			CpuArchitecture, {foreignKey: 'cpuArchitectureQID'});
	}
}

module.exports = {
	SystemRequirementsIncludesCpuArchitecture: SystemRequirementsIncludesCpuArchitecture
};
