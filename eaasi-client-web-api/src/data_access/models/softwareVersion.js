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
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		softwareVersionQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareVersionName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		softwareVersionDescription: {
			type: Sequelize.STRING,
			allowNull: false
		},
		softwareVersionNumber: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareVersionPublicationDate: {
			type: Sequelize.DATE,
			allowNull: true
		},
		softwareVersionSystemRequirements: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		isVersionOf_softwareProduct: {
			type: Sequelize.INTEGER,
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
	}
	return SoftwareVersion;
};
