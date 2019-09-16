'use strict';

const Sequelize = require('sequelize');

class ContentObjectHasPhotograph extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentObjectHasPhotograph.init({
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
		contentObject_photographFileID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'file',
				key: 'fileID'
			}
		},
		contentObject_photographLabel: {
			type: Sequelize.STRING,
			allowNull: true
		},
	}, { sequelize, tableName: 'contentObject_has_photograph' });
	return ContentObjectHasPhotograph;
};
