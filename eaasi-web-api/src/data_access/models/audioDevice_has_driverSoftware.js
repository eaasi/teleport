'use strict';

const Sequelize = require('sequelize');

class AudioDeviceHasDriverSoftware extends Sequelize.Model {}

module.exports = (sequelize) => {
	AudioDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		audioDevice_audioDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'audioDevice',
				key: 'audioDeviceID'
			}
		},
		audioDevice_driverSoftwareID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	},

	{
		sequelize, tableName: 'audioDevice_has_driverSoftware'
	});

	AudioDeviceHasDriverSoftware.associate = models => {
		models.AudioDeviceHasDriverSoftware.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
		models.AudioDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};

	return AudioDeviceHasDriverSoftware;
};
