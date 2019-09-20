'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasDeveloper extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasDeveloper.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_softwareDeveloperID: {
			type: Sequelize.INTEGER,
			references: {
				model: 'developer',
				key: 'developerID'
			}
		}
	}, { sequelize, tableName: 'pointerDevice' });
	SoftwareVersionHasDeveloper.associate = models => {
		models.SoftwareVersionHasDeveloper.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
		models.SoftwareVersionHasDeveloper.hasOne(models.Developer, {foreignKey: 'developerID'});
	};

	return SoftwareVersionHasDeveloper;
};
