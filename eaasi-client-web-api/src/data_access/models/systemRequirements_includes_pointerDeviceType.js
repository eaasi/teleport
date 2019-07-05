'use strict';

import {PointerDeviceType} from './pointerDeviceType';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesPointerDeviceType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_pointerDeviceTypeID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'pointerDevice',
					key: 'pointerDeviceID'
				}
			}
		}, { sequelize, tableName: 'systemRequirements_includes_pointerDeviceType' });
	};

	static associate(models) {
		SystemRequirementsIncludesPointerDeviceType.hasOne(
			SystemRequirements, {foreignKey: 'systemRequirementsID'});
		SystemRequirementsIncludesPointerDeviceType.hasOne(
			PointerDeviceType, {foreignKey: 'pointerDeviceID'});
	}
}

module.exports = {
	SystemRequirementsIncludesPointerDeviceType : SystemRequirementsIncludesPointerDeviceType
};
