'use strict';

const Sequelize = require('sequelize');

class AudioDeviceHasMachineInterface extends Sequelize.Model {}

module.exports = (sequelize) => {
	AudioDeviceHasMachineInterface.init({
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
		audioDevice_machineInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},

	{ sequelize,
		tableName: 'audioDevice_has_machineInterface'
	});

	AudioDeviceHasMachineInterface.associate = function(models){
		models.AudioDeviceHasMachineInterface.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
	};

	return AudioDeviceHasMachineInterface;
};
