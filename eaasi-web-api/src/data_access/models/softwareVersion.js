'use strict';

import {SystemRequirements} from './systemRequirements';
import {SoftwareProduct} from './softwareProduct';

const Sequelize = require('sequelize');

class SoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersion.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		softwareVersionQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareVersionName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		softwareVersionHelpText: {
			type: Sequelize.STRING,
			allowNull: false
		},
		softwareVersionNumber: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareVersionPublicationDate: {
			type: Sequelize.STRING,
			allowNull: true
		},
		isVersionOf_softwareProduct: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'softwareProduct',
				key: 'softwareProductID'
			}
		}
	}, { sequelize, tableName: 'softwareVersion' });
	SoftwareVersion.associate = models => {
		models.SoftwareVersion.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SoftwareVersion.belongsTo(models.SoftwareProduct, {foreignKey: 'softwareProductID'});
	};
	return SoftwareVersion;
};
