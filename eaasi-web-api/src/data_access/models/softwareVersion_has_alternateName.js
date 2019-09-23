'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasAlternateName extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasAlternateName.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_alternateName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareVersion_has_alternateName' });
	SoftwareVersionHasAlternateName.associate = models => {
		models.SoftwareVersionHasAlternateName.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return SoftwareVersionHasAlternateName;
};
