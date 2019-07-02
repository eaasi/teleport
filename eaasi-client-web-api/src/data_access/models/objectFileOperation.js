'use strict';

const Sequelize = require('sequelize');

class ObjectFileOperation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			operationID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			operationName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'objectFileOperation' });
	};

	static associate(models) {
	}
};

module.exports = {
	ObjectFileOperation: ObjectFileOperation
};
