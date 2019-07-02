/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('softwareFamily_hasPart_softwareProduct', {
		softwarefamilyid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareProduct',
				key: 'softwareProductID'
			}
		},
		haspart_softwareproduct: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareProduct',
				key: 'softwareProductID'
			}
		}
	}, {
		tableName: 'softwareFamily_hasPart_softwareProduct'
	});
};
