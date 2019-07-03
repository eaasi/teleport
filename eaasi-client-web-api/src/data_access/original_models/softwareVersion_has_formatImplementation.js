/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareVersion_has_formatImplementation', {
		softwareVersion_softwareVersionID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_formatImplementationID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'formatImplementation',
				key: 'formatImplementationID'
			}
		},
		softwareVersion_implementationOperation: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'formatOperation',
				key: 'operationID'
			}
		},
		defaultImplementation: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		tableName: 'softwareVersion_has_formatImplementation'
	});
};
