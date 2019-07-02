'use strict';

const Sequelize = require('sequelize');

class DisplayDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			displayResolutionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayResolutionName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'displayResolution' });
	};

	static associate(models) {
	}
}

module.exports = {
	ColorDepth: ColorDepth
};
