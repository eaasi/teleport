'use strict';

const Sequelize = require('sequelize');

class MediaType extends Sequelize.Model {}
module.exports = (sequelize) => {
	MediaType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		mediaTypeLabel: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		mediaTypeQID: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'mediaType' });
	return MediaType;
};
