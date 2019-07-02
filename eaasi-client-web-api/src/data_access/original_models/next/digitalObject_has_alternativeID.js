/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('digitalObject_has_alternativeID', {
		digitalObject_digitalObjectID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		alternativeID_alternativeID: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'digitalObject_has_alternativeID'
	});
};
