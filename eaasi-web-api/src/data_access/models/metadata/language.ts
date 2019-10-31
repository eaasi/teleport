'use strict';

const Sequelize = require('sequelize');

class Language extends Sequelize.Model { }
module.exports = (sequelize) => {
	Language.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		languageQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		languageLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'language' });
	return Language;
};

