'use strict';

const Sequelize = require('sequelize');

class DisplayDeviceHasDisplayResolution extends Sequelize.Model {}
module.exports = (sequelize) => {
	DisplayDeviceHasDisplayResolution.init({
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
		availableDisplayResolution: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'displayResolution',
				key: 'displayResolutionID'
			}
		}
	}, {sequelize, tableName: 'displayDevice_has_displayResolution'});
	DisplayDeviceHasDisplayResolution.associate = models => {
		models.DisplayDeviceHasDisplayResolution.hasOne(models.DisplayDevice, {foreignKey: 'displayDeviceID'});
		models.DisplayDeviceHasDisplayResolution.hasOne(models.DisplayResolution, {foreignKey: 'displayResolutionID'});
	};
	return DisplayDeviceHasDisplayResolution;
}
