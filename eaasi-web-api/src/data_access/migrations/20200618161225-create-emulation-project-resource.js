'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		const Sq = Sequelize.DataTypes;
		return queryInterface.createTable('emulation_project_resource', {
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			emulationProjectId: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'emulation_project',
					key: 'id'
				}
			},
			resourceId: {
				type: Sq.STRING,
				allowNull: false,
			},
			resourceType: {
				type: Sq.STRING,
				allowNull: false,
			},
			archiveId: {
				type: Sq.STRING,
				allowNull: false,
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('emulation_project_resource');
	}
};
