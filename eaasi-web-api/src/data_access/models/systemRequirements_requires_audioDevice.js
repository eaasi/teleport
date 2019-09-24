'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresAudioDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresAudioDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_requiresAudioDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'audioDevice',
				key: 'audioDeviceID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_requires_audioDevice' });
	SystemRequirementsRequiresAudioDevice.associate = models => {
		models.SystemRequirementsRequiresAudioDevice.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresAudioDevice.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
	};
	return SystemRequirementsRequiresAudioDevice;
};
