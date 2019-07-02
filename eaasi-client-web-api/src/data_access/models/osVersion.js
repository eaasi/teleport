'use strict';

const Sequelize = require('sequelize');

class OsVersion extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			osVersionQID: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			osVersionName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			osVersionDescription: {
				type: Sequelize.STRING,
				allowNull: true
			},
			osVersionNumber: {
				type: Sequelize.STRING,
				allowNull: true
			},
			osVersionPublicationDate: {
				type: Sequelize.DATE,
				allowNull: true
			},
			osVersionSystemRequirements: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			isVersionOf_osProduct: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'osVersion' });
	};

	static associate(models) {
	}
};

module.exports = {
	OsVersion: OsVersion
};
