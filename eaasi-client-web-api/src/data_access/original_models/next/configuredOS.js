/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('configuredOS', {
		configuredOperatingSystemID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		configuredDisplayResolution: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'displayResolution',
				key: 'displayResolutionID'
			}
		},
		configuredColorDepth: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'colorDepth',
				key: 'colorDepthID'
			}
		},
		configuredRegion: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'region',
				key: 'regionQID'
			}
		},
		configuredTimezone: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'timezone',
				key: 'timezoneQID'
			}
		},
		configuredDateTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		hasSource_softwareObjectID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		manifestationOf_osVersion: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'configuredOS'
	});
};
