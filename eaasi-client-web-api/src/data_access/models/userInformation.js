'use strict';

const Sequelize = require('sequelize');

class UserInformation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	UserInformation: UserInformation
};
