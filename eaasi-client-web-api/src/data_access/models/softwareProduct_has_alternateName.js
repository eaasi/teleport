'use strict';

import {AlternateName} from './alternateName';
import {SoftwareProduct} from './softwareProduct';

const Sequelize = require('sequelize');

class SoftwareProductHasAlternateName extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareProduct_softwareProductID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			softwareProduct_alternateNameID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'alternateName',
					key: 'alternateNameID'
				}
			}
		}, { sequelize, tableName: 'softwareProduct_has_alternateName' });
	};

	static associate(models) {
		PointerDevice.hasOne(SoftwareProduct, {foreignKey: 'softwareProductID'});
		PointerDevice.hasOne(AlternateName, {foreignKey: 'alternateNameID'});
	}
}

module.exports = {
	SoftwareProductHasAlternateName: SoftwareProductHasAlternateName
};
