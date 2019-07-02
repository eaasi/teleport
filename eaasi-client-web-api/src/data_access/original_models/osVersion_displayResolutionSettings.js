/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('osVersion_displayResolutionSettings', {
		osVersion_osVersionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_displayResolutionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'displayResolution',
				key: 'displayResolutionID'
			}
		}
	}, {
		tableName: 'osVersion_displayResolutionSettings'
	});
};
