'use strict';

const Sequelize = require('sequelize');

export default class ConfiguredNetwork extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};
