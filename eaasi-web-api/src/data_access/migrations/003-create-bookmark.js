'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		const Sq = Sequelize.DataTypes;
		return queryInterface.createTable('bookmark', {
			id: {
				type: Sq.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sq.STRING(50),
				allowNull: false,
			},
			resourceId: {
				type: Sq.STRING(128),
				allowNull: false
			},
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE
		})
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('bookmark');
	}
};
