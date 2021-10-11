import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'eaasi_task'
})
export class EaasiTask extends Model<EaasiTask> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false,
	})
	taskId: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true,
	})
	description: string;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
	})
	isDone: boolean;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true
	})
	status: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true
	})
	message: string;

	@Column({
		type: DataTypes.JSONB,
		allowNull: true
	})
	userData: JSON;

	@Column({
		type: DataTypes.JSONB,
		allowNull: true
	})
	object: JSON;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true
	})
	tenantId: string;

	@Column({
		type: DataTypes.STRING(50),
		allowNull: true
	})
	type: string;

}
