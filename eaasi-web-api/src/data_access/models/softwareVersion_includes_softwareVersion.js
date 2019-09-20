'use strict';

const Sequelize = require('sequelize');

class SoftwareVersionIncludesSoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareVersionIncludesSoftwareVersion.init({
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
		includesSoftwareVersionID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'softwareLicense',
				key: 'softwareLicenseQID'
			}
		}
	}, { sequelize, tableName: 'softwareVersion_includes_softwareVersion' });

	return SoftwareVersionIncludesSoftwareVersion;
};

