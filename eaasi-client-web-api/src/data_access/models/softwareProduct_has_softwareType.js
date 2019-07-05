import {SoftwareType} from './softwareType';
import {SoftwareProduct} from './softwareProduct';

const Sequelize = require('sequelize');

class SoftwareProductHasSoftwareType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareProduct_softwareProductID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			softwareProduct_softwareTypeQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'softwareType',
					key: 'softwareTypeQID'
				}
			}
		}, { sequelize, tableName: 'softwareProduct_has_softwareType' });
	};

	static associate(models) {
		SoftwareProductHasSoftwareType.hasOne(SoftwareProduct, {foreignKey: 'softwareProductID'});
		SoftwareProductHasSoftwareType.hasOne(SoftwareType, {foreignKey: 'softwareTypeID'});
	}
}

module.exports = {
	SoftwareProductHasSoftwareType: SoftwareProductHasSoftwareType
};
