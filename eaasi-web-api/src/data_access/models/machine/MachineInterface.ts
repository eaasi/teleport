import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'machine_interface'
})
export class MachineInterface extends Model<MachineInterface> {
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
	id: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	label: string;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	bandwidth: number;

	@Column({
		type: DataTypes.STRING(12),
		allowNull: true
	})
	bandwidthUnit: string
}
