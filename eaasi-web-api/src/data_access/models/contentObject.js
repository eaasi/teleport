'use strict';

const Sequelize = require('sequelize');

class ContentObject extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObject.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObjectLocalID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		contentObjectIDSource: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentObjectName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentObjectProductKey: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentObjectHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		},
	},
	{ sequelize, tableName: 'contentObject' });
	return ContentObject;
};
