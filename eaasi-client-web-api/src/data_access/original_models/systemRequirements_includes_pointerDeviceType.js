/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('systemRequirements_includes_pointerDeviceType', {
		systemRequirements_systemRequirementsID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_pointerDeviceTypeID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'pointerDevice',
				key: 'pointerDeviceID'
			}
		}
	}, {
		tableName: 'systemRequirements_includes_pointerDeviceType'
	});
};
