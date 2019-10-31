import { DataTypes } from 'sequelize';
import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';

@Table({
	tableName: 'application_log'
})
export default class ApplicationLog extends Model<ApplicationLog> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	level: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	source: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	message: string;
}
