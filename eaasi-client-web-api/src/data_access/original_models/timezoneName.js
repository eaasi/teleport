/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('timezoneName', {
		timezoneNameID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		timeZoneName: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'timezoneName'
	});
};
