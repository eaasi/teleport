'use strict';

import {SoftwareVersion} from './softwareVersion';
import {SoftwareLicense} from './softwareLicense';

const Sequelize = require('sequelize');

class SoftwareVersionHasSoftwareLicense extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareVersion_softwareVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_softwareLicenseQID: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'softwareLicense',
					key: 'softwareLicenseQID'
				}
			}
		}, { sequelize, tableName: 'softwareVersion_has_softwareLicense' });
	};

	static associate(models) {
		SoftwareVersionHasSoftwareLicense.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
		SoftwareVersionHasSoftwareLicense.hasOne(SoftwareLicense, {foreignKey: 'softwareLicenseQID'});
	}
}

module.exports = {
	SoftwareVersionHasSoftwareLicense: SoftwareVersionHasSoftwareLicense
};
