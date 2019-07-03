'use strict';

const Sequelize = require('sequelize');

class ConfiguredOsHasFormatOperation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredOS_configuredOperatingSystemID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredOS',
					key: 'configuredOperatingSystemID'
				}
			},
			formatOperation_opensFileFormat: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'fileFormat',
					key: 'fileFormatQID'
				}
			},
			formatOperation_usesConfiguredSoftware: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			}
		}, { sequelize, tableName: 'configuredOs_has_formatOperation' });
	};

	static associate(models) {
	}
};

module.exports = {
	ConfiguredOsHasFormatOperation: ConfiguredOsHasFormatOperation
};
