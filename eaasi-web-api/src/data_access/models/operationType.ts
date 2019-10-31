'use strict';

const Sequelize = require('sequelize');

class OperationType extends Sequelize.Model {}
module.exports = (sequelize) => {
	OperationType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		operationTypeLabel: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		}
	}, { sequelize, tableName: 'operationType' });
	return OperationType;
};

