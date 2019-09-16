'use strict';

const Sequelize = require('sequelize');

class ContentObjectIncludesSoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectIncludesSoftwareVersion.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentObject_contentObjectLocalID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'contentObject',
				key: 'contentObjectLocalID'
			}
		},
		contentObjectFile_includes_softwareVersion: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'contentObject_has_objectFile' });
	ContentObjectIncludesSoftwareVersion.associate = models => {
		models.ContentObjectIncludesSoftwareVersion.hasOne(models.ContentObject, {foreignKey: 'contentObjectLocalID'});
		models.ContentObjectIncludesSoftwareVersion.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return ContentObjectIncludesSoftwareVersion;
};
