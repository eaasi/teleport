import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'display_resolution'
})
export class DisplayResolution extends Model<DisplayResolution> {
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

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	label: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayResolutionWidth: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayResolutionHeight: number
}
