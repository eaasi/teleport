import ComputingEnvironment from '@/data_access/models/computing/ComputingEnvironment';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'content_environment'
})
export default class ContentEnvironment extends Model<ContentEnvironment> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@ForeignKey(() => ComputingEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	computingEnvironmentId: number

	@Column({
		type: DataTypes.TEXT,
		allowNull: false
	})
	helpText: string
}
