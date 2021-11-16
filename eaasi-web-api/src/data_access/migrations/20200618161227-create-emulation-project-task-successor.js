'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		const Sq = Sequelize.DataTypes;
		return queryInterface.createTable('emulation_project_task_successor', {
			taskId: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'eaasi_task',
					key: 'id'
				}
			},
			emulationProjectId: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'emulation_project',
					key: 'id'
				}
			},
			userId: {
				type: Sq.STRING(50),
				allowNull: false,
			},
			envId: {
				type: Sq.STRING,
				allowNull: false
			},
			type: {
				type: Sq.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('emulation_project_resource');
	}
};
