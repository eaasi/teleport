'use strict';

const Sequelize = require('sequelize');

class DisplayDeviceHasDisplayInterface extends Sequelize.Model {}
module.exports = (sequelize) => {
	DisplayDeviceHasDisplayInterface.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		displayDevice_displayDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'displayDevice',
				key: 'displayDeviceID'
			}
		},
		displayInterface_displayInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'displayDevice_has_displayInterface' });
	DisplayDeviceHasDisplayInterface.associate = models => {
		models.DisplayDeviceHasDisplayInterface.hasOne(models.DisplayDevice, {foreignKey: 'displayDeviceID'});
	};
	return DisplayDeviceHasDisplayInterface;
}

