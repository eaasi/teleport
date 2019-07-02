'use strict';

const Sequelize = require('sequelize');

class NetworkService extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	NetworkService: NetworkService
};
