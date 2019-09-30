'use strict';

const Sequelize = require('sequelize');

class FrequencyUnit extends Sequelize.Model {}

module.exports = (sequelize) => {
	FrequencyUnit.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		frequencyUnitLabel: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		frequencyUnitQID: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	}, { sequelize, tableName: 'frequencyUnit' });
	return FrequencyUnit;
};
