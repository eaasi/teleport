import ComputingEnvironment from '@/data_access/models/computing/computingEnvironment';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'computing_environment_has_event'
})
export default class ComputingEnvironmentHasEvent extends Model<ComputingEnvironmentHasEvent> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ComputingEnvironment)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	computingEnvironmentId: number

	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
	})
	eventId: number
}
