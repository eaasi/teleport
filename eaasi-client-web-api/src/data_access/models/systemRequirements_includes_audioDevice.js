'use strict';

import {SystemRequirements} from './systemRequirements';
import {AudioDevice} from './audioDevice';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesAudioDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		SystemRequirementsIncludesAudioDevice.hasOne(
			SystemRequirements, {foreignKey: 'systemRequirementsID'});
		SystemRequirementsIncludesAudioDevice.hasOne(
			AudioDevice, {foreignKey: 'audioDeviceID'});
	}
}

module.exports = {
	SystemRequirementsIncludesAudioDevice : SystemRequirementsIncludesAudioDevice
};
