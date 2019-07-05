import {OsVersion} from './osVersion';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class OsVersionIncludesSoftwareVersion extends Sequelize.Model {
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
			osVersion_softwareVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'osVersion_includes_softwareVersion' });
	};

	static associate(models) {
		OsVersionIncludesSoftwareVersion.hasOne(OsVersion,
			{foreignKey: 'osVersionID'});
		OsVersionIncludesSoftwareVersion.hasOne(SoftwareVersion,
			{foreignKey: 'softwareVersionID'});
	}
};

module.exports = {
	OsVersionIncludesSoftwareVersion: OsVersionIncludesSoftwareVersion
};
