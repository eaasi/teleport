import { MimeType } from '@/data_access/models/file/MimeType';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file_operation'
})
export class FileOperation extends Model<FileOperation> {
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
		type: DataTypes.STRING(128),
		allowNull: false,
	})
	label: number;

	@ForeignKey(() => MimeType)
	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	associatedMimeTypeQid: string;
}
