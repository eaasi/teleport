import {ProgrammingLanguage} from './programmingLanguage';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class SoftwareVersionHasProgrammingLanguage extends Sequelize.Model {
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
			softwareVersion_programmingLanguageQID: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'programmingLanguage',
					key: 'programmingLanguageQID'
				}
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		SoftwareVersionHasProgrammingLanguage.hasOne(SoftwareVersion, {foreignKey: 'softwareVersion'});
		SoftwareVersionHasProgrammingLanguage.hasOne(ProgrammingLanguage, {foreignKey: 'programmingLanguage'});
	}
}

module.exports = {
	SoftwareVersionHasProgrammingLanguage: SoftwareVersionHasProgrammingLanguage
};
