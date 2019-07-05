'use strict';

import {PointerDevice} from './pointerDevice';

const Sequelize = require('sequelize');

class PointerDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			pointerDevice_pointerDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'pointerDevice',
					key: 'pointerDeviceID'
				}
			},
			pointerDevice_driverSoftwareID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'pointerDevice_has_driverSoftware' });
	};

	static associate(models) {
		PointerDeviceHasDriverSoftware.hasOne(PointerDevice, {foreignKey: 'pointerDeviceID'});
	}
}

module.exports = {
	PointerDeviceHasDriverSoftware: PointerDeviceHasDriverSoftware
};
