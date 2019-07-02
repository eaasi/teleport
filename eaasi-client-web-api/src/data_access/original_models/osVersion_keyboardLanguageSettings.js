/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('osVersion_keyboardLanguageSettings', {
		osVersion_osVersionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_keyboardLanguageQID: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'osVersion_keyboardLanguageSettings'
	});
};
