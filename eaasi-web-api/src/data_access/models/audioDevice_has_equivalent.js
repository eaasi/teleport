'use strict';

const Sequelize = require('sequelize');

class AudioDeviceHasEquivalent extends Sequelize.Model {}

module.exports = (sequelize) => {
	AudioDeviceHasEquivalent.init({
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
		audioDevice_equivalentAudioDevice: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		tableName: 'audioDevice_has_equivalent'
	});

	AudioDeviceHasEquivalent.associate = function(models){
		models.AudioDeviceHasEquivalent.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
	};

	return AudioDeviceHasEquivalent;
};
