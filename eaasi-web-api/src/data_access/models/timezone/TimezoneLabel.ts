import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'timezone_label'
})
export default class Timezone extends Model<Timezone> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => Timezone)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	timezoneQid: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	label: string
}
