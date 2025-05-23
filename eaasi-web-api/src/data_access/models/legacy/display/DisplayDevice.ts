import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'display_device'
})
export class DisplayDevice extends Model<DisplayDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: true
	})
	id: number

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	qid: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	name: string
}
