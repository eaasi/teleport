import { PointerDeviceType } from '@/data_access/models/legacy/pointer/PointerDeviceType';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'pointer_device'
})
export class PointerDevice extends Model<PointerDevice> {
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
	id: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	label: string;

	@ForeignKey(() => PointerDeviceType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	pointerDeviceTypeID: number;
}
