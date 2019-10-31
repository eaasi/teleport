'use strict';

const Sequelize = require('sequelize');

class SoftwareLicense extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareLicense.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareLicenseID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		softwareLicenseQID: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		softwareLicenseLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareLicense' });
	return SoftwareLicense;
};
