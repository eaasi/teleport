'use strict';

const Sequelize = require('sequelize');

class SoftwareFamilyHasPartSoftwareProduct extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareFamilyHasPartSoftwareProduct.init({
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
	SoftwareFamilyHasPartSoftwareProduct.associate = models => {
		models.SoftwareFamilyHasPartSoftwareProduct.hasOne(
			models.SoftwareProduct, {foreignKey: 'softwareProductID', as: 'softwareFamilyProduct'});
		models.SoftwareFamilyHasPartSoftwareProduct.hasOne(
			models.SoftwareProduct, {foreignKey: 'softwareProductID', as: 'hasPartSoftwareProduct'});
	};
	return SoftwareFamilyHasPartSoftwareProduct;
};
