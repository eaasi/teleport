'use strict';

const Sequelize = require('sequelize');

class MachineRecommendation extends Sequelize.Model {}
module.exports = (sequelize) => {
	MachineRecommendation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		machineRecommendation_softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		machineRecommendation_emulatorProjectID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		machineRecommendation_recommendedMachineID: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		machineRecommendation_recommendationLevel: {
			type: Sequelize.STRING,
			allowNull: true
		},
		machineRecommendation_description: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'machineRecommendation' });
	return MachineRecommendation;
};
