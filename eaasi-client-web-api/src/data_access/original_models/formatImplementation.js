/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('formatImplementation', {
		formatImplementationID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		formatImplementationName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		implementationExtension: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'fileExtension',
				key: 'fileExtensionID'
			}
		}
	}, {
		tableName: 'formatImplementation'
	});
};
