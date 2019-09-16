'use strict';

const Sequelize = require('sequelize');

class ContentEnvironmentHasContentObject extends Sequelize.Model {}

module.exports = (sequelize) => {
	ContentEnvironmentHasContentObject.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironment_contentEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		contentEnvironment_contentObjectLocalID : {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'contentEnvironment_has_contentObject' });

	return ContentEnvironmentHasContentObject;
};
