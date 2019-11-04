import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'machine_interface'
})
export default class MachineInterface extends Model<MachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	qid: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	label: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	bandwidth: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	bandwidthUnit: string
}
