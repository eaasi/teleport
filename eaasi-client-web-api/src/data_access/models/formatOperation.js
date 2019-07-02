'use strict';

const Sequelize = require('sequelize');

class FormatOperation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			operationID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			operationName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'formatOperation' });
	};

	static associate(models) {
	}
}

module.exports = {
	FormatOperation: FormatOperation
};
