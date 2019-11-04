import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'computingEnvironment_has_event'
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

	@ForeignKey(() => Event)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
	})
	eventId: number
}
