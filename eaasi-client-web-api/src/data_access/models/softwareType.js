'use strict';

const Sequelize = require('sequelize');

class SoftwareType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			softwareTypeQID: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			softwareTypeName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'softwareType' });
	};

	static associate(models) {
	}
};

module.exports = {
	SoftwareType: SoftwareType
};
