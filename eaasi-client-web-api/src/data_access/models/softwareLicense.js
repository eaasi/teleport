'use strict';

const Sequelize = require('sequelize');

class SoftwareLicense extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareLicense.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareLicenseQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		softwareLicenseName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareLicense' });
	return SoftwareLicense;
};
