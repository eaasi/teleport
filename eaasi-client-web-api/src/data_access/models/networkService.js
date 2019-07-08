'use strict';

const Sequelize = require('sequelize');

class NetworkService extends Sequelize.Model {}
module.exports = (sequelize) => {
	NetworkService.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		networkServiceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		networkServiceName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		networkServiceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		defaultPort: {
			type: Sequelize.STRING,
			allowNull: true
		},
		defaultPortRange: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'networkService' });
	return NetworkService;
};
