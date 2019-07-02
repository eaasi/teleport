'use strict';

const Sequelize = require('sequelize');

class KeyboardLayout extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	KeyboardLayout: KeyboardLayout
};
