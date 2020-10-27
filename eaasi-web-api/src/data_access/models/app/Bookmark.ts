import { EaasiUser } from '@/data_access/models/app/EaasiUser';
import { DataTypes } from 'sequelize';
import { Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'bookmark'
})
export class Bookmark extends Model<Bookmark> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	updatedAt: Date = new Date();

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
