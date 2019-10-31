'use strict';

const Sequelize = require('sequelize');

class DisplayDeviceHasColorDepth extends Sequelize.Model {}

module.exports = (sequelize) => {
	DisplayDeviceHasColorDepth.init({
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
		colorDepth_colorDepthID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'colorDepth',
				key: 'colorDepthID'
			}
		}
	}, { sequelize, tableName: 'displayDevice_has_colorDepth' });
	DisplayDeviceHasColorDepth.associate = models => {

		models.DisplayDeviceHasColorDepth.hasOne(models.DisplayDevice, {foreignKey: 'displayDeviceID'});
		models.DisplayDeviceHasColorDepth.hasOne(models.ColorDepth, {foreignKey: 'colorDepthID'});
	};
	return DisplayDeviceHasColorDepth;
};
