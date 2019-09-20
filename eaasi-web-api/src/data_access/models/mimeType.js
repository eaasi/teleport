'use strict';

const Sequelize = require('sequelize');

class MimeType extends Sequelize.Model {}
module.exports = (sequelize) => {
	MimeType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		mimeTypeLabel_pk: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		mimeTypeLabel: {
			type: Sequelize.STRING,
		},
	}, { sequelize, tableName: 'mimeType' });
	return MimeType;
};
