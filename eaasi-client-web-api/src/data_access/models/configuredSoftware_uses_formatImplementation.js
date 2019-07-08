'use strict';

const Sequelize = require('sequelize');

class ConfiguredSoftwareUsesFormatImplementation extends Sequelize.Model {}
module.exports = (sequelize) => {
	ConfiguredSoftwareUsesFormatImplementation.init({
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
	}, {sequelize, tableName: 'configuredSoftware_uses_formatImplementation'});
	ConfiguredSoftwareUsesFormatImplementation.associate = models => {
		models.ConfiguredSoftwareUsesFormatImplementation.hasOne(
			models.ConfiguredSoftware, { foreignKey: 'configuredSoftwareVersionID' }
		);
		models.ConfiguredSoftwareUsesFormatImplementation.hasOne(
			models.FormatImplementation, { foreignKey: 'formatImplementationID' }
		);
	}
	return ConfiguredSoftwareUsesFormatImplementation;
};
