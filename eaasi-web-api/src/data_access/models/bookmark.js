'use strict';

const Sequelize = require('sequelize');

class Bookmark extends Sequelize.Model {}

module.exports = sequelize => {
	Bookmark.init({
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userID: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		// TODO: resources will be objs
		resourceID: {
			type: Sequelize.STRING,
			allowNull: false
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	},
    
	{
		sequelize,
		tableName: 'bookmark'
	});
    
	return Bookmark;
}