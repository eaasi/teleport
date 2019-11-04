'use strict';

const Sequelize = require('sequelize');

class SoftwareProductHasSoftwareType extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareProductHasSoftwareType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareProduct_softwareProductID: {
			type: Sequelize.STRING,
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
	SoftwareProductHasSoftwareType.associate = models => {
		models.SoftwareProductHasSoftwareType.hasOne(models.SoftwareProduct, {foreignKey: 'softwareProductID'});
		models.SoftwareProductHasSoftwareType.hasOne(models.SoftwareType, {foreignKey: 'softwareTypeID'});
	};
	return SoftwareProductHasSoftwareType;
};
