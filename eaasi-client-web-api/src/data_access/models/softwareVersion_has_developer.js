'use strict';

import {Developer} from './developer';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class SoftwareVersionHasDeveloper extends Sequelize.Model {
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
			softwareVersion_softwareDeveloperQID: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'developer',
					key: 'developerQID'
				}
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SoftwareVersionHasDeveloper.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
		SoftwareVersionHasDeveloper.hasOne(Developer, {foreignKey: 'developerQID'});
	}
}

module.exports = {
	SoftwareVersionHasDeveloper : SoftwareVersionHasDeveloper
};
