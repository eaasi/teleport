/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mountFormat', {
		mountFormatQID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		mountFormatName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'mountFormat'
	});
};
