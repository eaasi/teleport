import { ContentObject } from '@/data_access/models/legacy/content/ContentObject';
import { File } from '@/data_access/models/legacy/file/File';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'content_object_has_object_file'
})
export class ContentObjectHasObjectFile extends Model<ContentObjectHasObjectFile> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ContentObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	contentObjectLocalID: number;

	@ForeignKey(() => File)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	fileID: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true
	})
	label: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	mediaTypeName: string;

	@Column({
		type: DataTypes.STRING(1028),
		allowNull: true
	})
	productKey: string;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	fileOrder: number;
}
