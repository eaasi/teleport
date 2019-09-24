'use strict';

const Sequelize = require('sequelize');

class KeyboardLayout extends Sequelize.Model { }
module.exports = (sequelize) => {
	KeyboardLayout.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		keyboardLayoutID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		keyboardLayoutQID: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		keyboardLayoutLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'keyboardLayout' });
	return KeyboardLayout;
};

