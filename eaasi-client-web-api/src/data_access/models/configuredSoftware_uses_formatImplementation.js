'use strict';

import {ConfiguredSoftware} from './configuredSoftware';
import {FormatImplementation} from './formatImplementation';

const Sequelize = require('sequelize');

class ConfiguredSoftwareUsesFormatImplementation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			configuredSoftware_configuredSoftwareManifestationID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'configuredSoftware',
					key: 'configuredSoftwareVersionID'
				}
			},
			configuredSoftware_formatImplementation: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'formatImplementation',
					key: 'formatImplementationID'
				}
			},
			configuredFormatOperation: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'formatOperation',
					key: 'operationID'
				}
			}
		}, { sequelize, tableName: 'configuredSoftware_uses_formatImplementation' });
	};

	static associate(models) {
		ConfiguredSoftwareUsesFormatImplementation.hasOne(
			ConfiguredSoftware,
			{
				foreignKey: 'configuredSoftwareVersionID'
			}
		);
		ConfiguredSoftwareUsesFormatImplementation.hasOne(
			FormatImplementation,
			{
				foreignKey: 'formatImplementationID'
			}
		);
	}
};

module.exports = {
	ConfiguredSoftwareUsesFormatImplementation: ConfiguredSoftwareUsesFormatImplementation
};
