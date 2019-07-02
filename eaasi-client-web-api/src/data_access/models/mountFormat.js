'use strict';

const Sequelize = require('sequelize');

class MountFormat extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	MountFormat: MountFormat
};
