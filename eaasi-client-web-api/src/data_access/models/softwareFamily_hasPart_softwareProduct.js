'use strict';

import {SoftwareProduct} from './softwareProduct';

const Sequelize = require('sequelize');

class SoftwareFamilyHasPartSoftwareProduct extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareFamilyID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			hasPart_softwareProduct: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			}
		}, { sequelize, tableName: 'softwareFamily_hasPart_softwareProduct' });
	};

	static associate(models) {
		SoftwareFamilyHasPartSoftwareProduct.hasOne(
			SoftwareProduct, {foreignKey: 'softwareProductID', as: 'softwareFamilyProduct'});
		SoftwareFamilyHasPartSoftwareProduct.hasOne(
			SoftwareProduct, {foreignKey: 'softwareProductID', as: 'hasPartSoftwareProduct'});
	}
}

module.exports = {
	SoftwareFamilyHasPartSoftwareProduct: SoftwareFamilyHasPartSoftwareProduct
};
