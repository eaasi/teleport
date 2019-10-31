'use strict';

const Sequelize = require('sequelize');

class DisplayInterface extends Sequelize.Model {}
module.exports = (sequelize) => {
	DisplayInterface.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		displayInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		displayInterfaceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		displayInterfaceLabel: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'displayInterface' });
	return DisplayInterface;
};
