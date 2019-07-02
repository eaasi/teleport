'use strict';

const Sequelize = require('sequelize');

class AudioDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			audioDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			audioDeviceQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			audioDeviceName: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'audioDevice' });
	};

	static associate(models) {
	}
}

module.exports = {
	AudioDevice: AudioDevice
};
