'use strict';

import {SystemRequirements} from './systemRequirements';
import {SoftwareProduct} from './softwareProduct';

const Sequelize = require('sequelize');

class SoftwareVersion extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		SoftwareVersion.hasOne(SystemRequirements, {foreignKey: 'systemRequirementsID'});
		SoftwareVersion.belongsTo(SoftwareProduct, {foreignKey: 'softwareProductID'});
	}
};

module.exports = {
	SoftwareVersion: SoftwareVersion
};
