'use strict';

const Sequelize = require('sequelize');

class SoftwareLicense extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareLicenseQID: {
				type: Sequelize.STRING,
				allowNull: false
			},
			softwareLicenseName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'softwareLicense' });
	};

	static associate(models) {
	}
};

module.exports = {
	SoftwareLicense : SoftwareLicense
};
