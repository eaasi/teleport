'use strict';

const Sequelize = require('sequelize');

class MimeType extends Sequelize.Model {}
module.exports = (sequelize) => {
	MimeType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		mimeTypeLabel: {
			type: Sequelize.STRING,
			primaryKey: true
		},
	}, { sequelize, tableName: 'mimeType' });
	return MimeType;
};
