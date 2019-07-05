import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class SoftwareVersionLanguageSettings extends Sequelize.Model {
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
			softwareVersion_languageQID: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		}, { sequelize, tableName: 'softwareVersion_languageSettings' });
	};

	static associate(models) {
		SoftwareVersionLanguageSettings.hasOne(
			SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
};

module.exports = {
	SoftwareVersionLanguageSettings: SoftwareVersionLanguageSettings
};
