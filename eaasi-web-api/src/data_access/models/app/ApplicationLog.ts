import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'application_log'
})
export default class ApplicationLog extends Model<ApplicationLog> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(16),
		allowNull: false
	})
	level: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	source: string;

	@Column({
		type: DataTypes.STRING(1028),
		allowNull: false
	})
	message: string;
}
