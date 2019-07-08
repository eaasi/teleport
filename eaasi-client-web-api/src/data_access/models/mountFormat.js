'use strict';

const Sequelize = require('sequelize');

class MountFormat extends Sequelize.Model {}
module.exports = (sequelize) => {
	MountFormat.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		mountFormatQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		mountFormatName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'mountFormat' });
	return MountFormat;
};
