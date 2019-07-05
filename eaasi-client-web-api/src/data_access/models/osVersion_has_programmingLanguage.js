'use strict';

import {ProgrammingLanguage} from './programmingLanguage';
import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionHasProgrammingLanguage extends Sequelize.Model {
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
			osVersion_programmingLanguageQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'programmingLanguage',
					key: 'programmingLanguageQID'
				}
			}
		}, { sequelize, tableName: 'osVersion_has_programmingLanguage' });
	};

	static associate(models) {
		OsVersionHasProgrammingLanguage.hasOne(OsVersion,
			{foreignKey: 'osVersionID'});
		OsVersionHasProgrammingLanguage.hasOne(ProgrammingLanguage,
			{foreignKey: 'programmingLanguageQID'});
	}
};

module.exports = {
	OsVersionHasProgrammingLanguage: OsVersionHasProgrammingLanguage
};
