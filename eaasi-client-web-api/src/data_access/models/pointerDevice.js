'use strict';

import {PointerDeviceType} from './pointerDeviceType';

const Sequelize = require('sequelize');

class PointerDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			pointerDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			pointerDeviceQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			pointerDeviceName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			pointerDeviceType: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'pointerDeviceType',
					key: 'pointerDeviceTypeID'
				}
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		PointerDevice.hasOne(PointerDeviceType, {foreignKey: 'pointerDeviceTypeID'});
	}
}

module.exports = {
	PointerDevice: PointerDevice
};
