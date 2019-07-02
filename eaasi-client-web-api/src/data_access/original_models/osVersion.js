/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('osVersion', {
		osVersionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		osVersionQID: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		osVersionName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		osVersionDescription: {
			type: DataTypes.STRING,
			allowNull: true
		},
		osVersionNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		osVersionPublicationDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		osVersionSystemRequirements: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		isVersionOf_osProduct: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'osVersion'
	});
};
