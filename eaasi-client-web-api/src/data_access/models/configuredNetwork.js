'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetwork extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetwork.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredNetworkID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		configuredNetworkName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredNetworkDescription: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredNetwork' });
	return ConfiguredNetwork;
};
