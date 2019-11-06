import ContentObject from '@/data_access/models/content/ContentObject';
import File from '@/data_access/models/file/File';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'content_object_has_object_file'
})
export default class ContentObjectHasObjectFile extends Model<ContentObjectHasObjectFile> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ContentObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	contentObjectID: number;

	@ForeignKey(() => File)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	fileID: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: false
	})
	fileLabel: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false
	})
	mediaTypeName: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false
	})
	productKey: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	fileOrder: number
}
