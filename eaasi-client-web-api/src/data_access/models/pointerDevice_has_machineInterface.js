'use strict';

const Sequelize = require('sequelize');

class PointerDeviceHasMachineInterface extends Sequelize.Model {}
module.exports = (sequelize) => {
	PointerDeviceHasMachineInterface.init({
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
	PointerDeviceHasMachineInterface.associate = models => {
		models.PointerDeviceHasMachineInterface.hasOne(models.PointerDevice, {foreignKey: 'pointerDeviceID'});
	};

	return PointerDeviceHasMachineInterface;
}
