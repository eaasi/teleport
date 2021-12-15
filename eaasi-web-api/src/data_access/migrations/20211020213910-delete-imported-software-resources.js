'use strict';

// legacy migration
const migration = {
	up: (queryInterface, Sequelize) => {
		const Sq = Sequelize.DataTypes;
		return queryInterface.createTable('imported_software_resource', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				primaryKey: true,
				type: Sq.INTEGER,
				allowNull: false,
				autoIncrement: true
			},
			eaasiId: {
				type: Sq.STRING(64),
				allowNull: false
			},
			environmentTemplateID: {
				type: Sq.STRING(64),
				allowNull: true
			},
			name: {
				type: Sq.STRING(64),
				allowNull: true
			},
			localIdentifier: {
				type: Sq.STRING(64),
				allowNull: true
			},
			localIdentifierSource: {
				type: Sq.STRING(64),
				allowNull: true
			},
			version: {
				type: Sq.STRING(32),
				allowNull: true
			},
			isUrlSource: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			urlSource: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('imported_software_resource');
	}
};

module.exports = {
	up: migration.down,
	down: migration.up,
};
