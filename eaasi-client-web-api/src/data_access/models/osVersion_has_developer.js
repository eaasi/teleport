'use strict';

import {OsVersion} from './osVersion';
import {Developer} from './developer';

const Sequelize = require('sequelize');

class OsVersionHasDeveloper extends Sequelize.Model {
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
			osVersion_developerQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'developer',
					key: 'developerQID'
				}
			}
		}, { sequelize, tableName: 'osVersion_has_developer' });
	};

	static associate(models) {
		OsVersionHasDeveloper.hasOne(OsVersion, {foreignKey: 'osVersionID'});
		OsVersionHasDeveloper.hasOne(Developer, {foreignKey: 'developerQID'});
	}
};

module.exports = {
	OsVersionHasDeveloper: OsVersionHasDeveloper
};
