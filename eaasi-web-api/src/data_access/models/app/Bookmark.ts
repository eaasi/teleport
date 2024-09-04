import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Table, UpdatedAt } from 'sequelize-typescript';
//import { EaasiUser } from '.';
import { EaasiUserOwnedModel } from './base-models/EaasiIUserOwnedModel';

interface IBookmark {
	createdAt: Date;
}

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

	@Column({
		type: DataTypes.STRING(50),
		allowNull: false,
		})
	userId: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false,
		})
	resourceId: string;
}
