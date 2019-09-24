'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresNetworkDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresNetworkDevice.init({
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
		systemRequirements_requiresNetworkDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'networkDevice',
				key: 'networkDeviceID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_requires_networkDevice' });
	SystemRequirementsRequiresNetworkDevice.associate = models => {
		models.SystemRequirementsRequiresNetworkDevice.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresNetworkDevice.hasOne(models.NetworkDevice, {foreignKey: 'networkDeviceID'});
	};
	return SystemRequirementsRequiresNetworkDevice;
};
