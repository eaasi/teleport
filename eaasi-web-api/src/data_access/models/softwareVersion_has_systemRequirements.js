'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionHasSystemRequirements extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionHasSystemRequirements.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareVersion_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		softwareVersion_systemRequirementsID: {
			type: Sequelize.STRING,
			allowNull: true,
		}
	}, { sequelize, tableName: 'softwareVersion_has_systemRequirements' });

	return SoftwareVersionHasSystemRequirements;
};

