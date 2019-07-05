'use strict';

import {PointerDevice} from './pointerDevice';

const Sequelize = require('sequelize');

class PointerDeviceHasMachineInterface extends Sequelize.Model {
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
			pointerDevice_machineInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'pointerDevice_has_machineInterface' });
	};

	static associate(models) {
		PointerDeviceHasMachineInterface.hasOne(PointerDevice, {foreignKey: 'pointerDeviceID'});
	}
}

module.exports = {
	PointerDeviceHasMachineInterface: PointerDeviceHasMachineInterface
};
