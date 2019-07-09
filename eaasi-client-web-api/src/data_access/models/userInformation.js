'use strict';

const Sequelize = require('sequelize');

class UserInformation extends Sequelize.Model {}

module.exports = (sequelize) => {
	UserInformation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		userInformationID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.STRING,
			allowNull: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: true
		},
		organization: {
			type: Sequelize.STRING,
			allowNull: true
		},
		admin: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		}
	}, { sequelize, tableName: 'userInformation' });

	UserInformation.associate = models => {
		models.UserInformation.hasMany(models.ConfiguredSoftwareHasUserInformation);
	};

	return UserInformation;
};
