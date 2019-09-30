'use strict';

const Sequelize = require('sequelize');

class NetworkComputingEnvironmentExpectedService extends Sequelize.Model {}
module.exports = (sequelize) => {
	NetworkComputingEnvironmentExpectedService.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		networkComputingEnvironment_networkEnvironmentID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		networkComputingEnvironment_computingEnvironmentID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		networkComputingEnvironment_expectedService: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		networkComputingEnvironment_servicePortExpected: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'networkComputingEnvironment_expectedService' });

	return NetworkComputingEnvironmentExpectedService;
};
