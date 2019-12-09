import { Timezone } from '@/data_access/models/timezone/Timezone';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'timezone_label'
})
export class TimezoneLabel extends Model<TimezoneLabel> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => Timezone)
	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	timezoneQid: string

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false,
	})
	label: string
}
