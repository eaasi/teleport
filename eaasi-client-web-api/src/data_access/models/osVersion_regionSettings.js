import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionRegionSettings extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersion_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_regionQID: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'region',
					key: 'regionQID'
				}
			},
			osVersion_defaultRegion: {
				type: Sequelize.BOOLEAN,
				allowNull: true
			}
		}, { sequelize, tableName: 'osVersion_regionSettings' });
	};

	static associate(models) {
		OsVersionRegionSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
	}
};

module.exports = {
	OsVersionRegionSettings: OsVersionRegionSettings
};
