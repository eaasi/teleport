'use strict';

import {SoftwareVersion} from './softwareVersion';
import {SystemRequirements} from './systemRequirements';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesSoftwareVersion extends Sequelize.Model {
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
			systemRequirements_softwareVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SystemRequirementsIncludesSoftwareVersion.hasOne(
			SystemRequirements, {foreignKey: 'systemRequirementsID'});

		SystemRequirementsIncludesSoftwareVersion.hasOne(
			SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
}

module.exports = {
	SystemRequirementsIncludesSoftwareVersion : SystemRequirementsIncludesSoftwareVersion
};
