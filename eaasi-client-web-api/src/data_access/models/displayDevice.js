'use strict';

const Sequelize = require('sequelize');

class DisplayDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			displayDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayDeviceQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			displayDeviceName: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'displayDevice' });
	};

	static associate(models) {
	}
}

module.exports = {
	ColorDepth: ColorDepth
};
