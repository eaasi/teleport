import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionLanguageSettings extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersion_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_languageQID: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			osVersion_DefaultLanguage: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			}
		}, { sequelize, tableName: 'osVersion_languageSettings' });
	};

	static associate(models) {
		OsVersionLanguageSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
	}
};

module.exports = {
	OsVersionLanguageSettings: OsVersionLanguageSettings
};
