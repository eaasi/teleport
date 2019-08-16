'use strict';

const Sequelize = require('sequelize');

class KeyboardLayout extends Sequelize.Model { }
module.exports = (sequelize) => {
	KeyboardLayout.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		keyboardLayoutQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		keyboardLayoutName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'keyboardLayout' });
	return KeyboardLayout;
};

