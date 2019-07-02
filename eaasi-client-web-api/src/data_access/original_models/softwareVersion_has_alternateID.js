/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareVersion_has_alternateID', {
		softwareVersion_softwareVersionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_alternateID: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'softwareVersion_has_alternateID'
	});
};
