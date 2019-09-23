'use strict';

const Sequelize = require('sequelize');

class SoftwareFamilyVersionHasSoftwareProduct extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareFamilyVersionHasSoftwareProduct.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareFamilyID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareProduct',
				key: 'softwareProductID'
			}
		},
		hasPart_softwareProductID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareProduct',
				key: 'softwareProductID'
			}
		}
	}, { sequelize, tableName: 'softwareFamilyVersion_has_softwareProduct' });
	SoftwareFamilyVersionHasSoftwareProduct.associate = models => {
		models.SoftwareFamilyHasPartSoftwareProduct.hasOne(
			models.SoftwareProduct, {foreignKey: 'softwareProductID', as: 'softwareFamilyProduct'});
		models.SoftwareFamilyHasPartSoftwareProduct.hasOne(
			models.SoftwareProduct, {foreignKey: 'softwareProductID', as: 'hasSoftwareProduct'});
	};
	return SoftwareFamilyVersionHasSoftwareProduct;
};
