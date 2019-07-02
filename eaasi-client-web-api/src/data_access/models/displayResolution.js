'use strict';

const Sequelize = require('sequelize');

class DisplayResolution extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
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
	DisplayResolution: DisplayResolution
};
