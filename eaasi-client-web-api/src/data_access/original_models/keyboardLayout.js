/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('keyboardLayout', {
		keyboardLayoutQID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		keyboardLayoutName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'keyboardLayout'
	});
};
