/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareObject_isManifestationOf_softwareVersion', {
		softwareObject_softwareObjectID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		softwareObject_softwareVersionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, {
		tableName: 'softwareObject_isManifestationOf_softwareVersion'
	});
};
