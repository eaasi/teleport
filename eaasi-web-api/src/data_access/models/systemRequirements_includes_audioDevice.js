'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesAudioDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesAudioDevice.init({
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
		systemRequirements_audioDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'audioDevice',
				key: 'audioDeviceID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_includes_audioDevice' });
	SystemRequirementsIncludesAudioDevice.associate = models => {
		models.SystemRequirementsIncludesAudioDevice.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsIncludesAudioDevice.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
	};
	return SystemRequirementsIncludesAudioDevice;
};
