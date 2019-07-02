/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('systemRequirements_includes_osVersion', {
		systemRequirements_systemRequirementsID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_osVersionID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		}
	}, {
		tableName: 'systemRequirements_includes_osVersion'
	});
};
