'use strict';

// legacy migration
const migration = {
	up: (queryInterface, Sequelize) => {
		const Sq = Sequelize.DataTypes;
		return queryInterface.createTable('emulator', {
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sq.STRING(64),
				allowNull: false,
				columnName: 'name',
				unique: true,
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('emulator');
	}
};

module.exports = {
	up: migration.down,
	down: migration.up,
};
