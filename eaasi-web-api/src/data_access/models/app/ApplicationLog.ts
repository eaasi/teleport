import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'application_log'
})
export class ApplicationLog extends Model<ApplicationLog> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	updatedAt: Date = new Date();

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
		type: DataTypes.JSONB,
		allowNull: true
	})
	message: string;
}
