'use strict';

const Sequelize = require('sequelize');

class Bookmarks extends Sequelize.Model {}

module.exports = sequelize => {
	Bookmarks.init({
		userID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: false
		},
		// TODO: resources will be objs
		resourceID: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
    
	{
		sequelize,
		tableName: 'bookmars'
	});
    
	return Bookmarks;
}