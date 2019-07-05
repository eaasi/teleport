'use strict';

import {SystemRequirements} from './systemRequirements';
import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesOsVersion extends Sequelize.Model {
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
			systemRequirements_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			}
		}, { sequelize, tableName: 'systemRequirements_includes_osVersion' });
	};

	static associate(models) {
		SystemRequirementsIncludesOsVersion.hasOne(
			SystemRequirements, {foreignKey: 'systemRequirementsID'});
		SystemRequirementsIncludesOsVersion.hasOne(
			OsVersion, {foreignKey: 'osVersionID'});
	}
}

module.exports = {
	SystemRequirementsIncludesOsVersion : SystemRequirementsIncludesOsVersion
};
