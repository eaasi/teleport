import EaasiUser from '@/data_access/models/app/EaasiUser';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'bookmark'
})
export default class Bookmark extends Model<Bookmark> {
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

	@ForeignKey(() => EaasiUser)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	userId: number;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false,
	})
	resourceId: string;
}
