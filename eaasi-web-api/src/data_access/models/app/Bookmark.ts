import { DataTypes } from 'sequelize';
import { Column, CreatedAt, ForeignKey, Table, UpdatedAt } from 'sequelize-typescript';
import { EaasiUser } from '.';
import { EaasiUserOwnedModel } from './base-models/EaasiIUserOwnedModel';

@Table({
	tableName: 'bookmark'
})
export class Bookmark extends EaasiUserOwnedModel {
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
