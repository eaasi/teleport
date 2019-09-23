'use strict';

const Sequelize = require('sequelize');

class SoftwareProductHasAlternateName extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareProductHasAlternateName.init({
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
		softwareProduct_alternateName: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'alternateName',
				key: 'alternateNameID'
			}
		}
	}, { sequelize, tableName: 'softwareProduct_has_alternateName' });
	SoftwareProductHasAlternateName.associate = models => {
		models.SoftwareProductHasAlternateName.hasOne(models.SoftwareProduct, {foreignKey: 'softwareProductID'});
		models.SoftwareProductHasAlternateName.hasOne(models.AlternateName, {foreignKey: 'alternateNameID'});
	};

	return SoftwareProductHasAlternateName;
};

