'use strict';

const Sequelize = require('sequelize');

class RecommendationLevel extends Sequelize.Model {}
module.exports = (sequelize) => {
	RecommendationLevel.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		recommendationLevelLabel: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false
		},
	}, { sequelize, tableName: 'readWriteStatus' });

	return RecommendationLevel;
};

