'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasDeveloper extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasDeveloper.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_softwareDeveloperQID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'developer',
				key: 'developerQID'
			}
		}
	}, { sequelize, tableName: 'pointerDevice' });
	SoftwareVersionHasDeveloper.associate = models => {
		models.SoftwareVersionHasDeveloper.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.SoftwareVersionHasDeveloper.hasOne(models.Developer, {foreignKey: 'developerQID'});
	};

	return SoftwareVersionHasDeveloper;
}
