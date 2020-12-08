import { FileFormat } from '@/data_access/models/legacy/file/FileFormat';
import { MimeType } from '@/data_access/models/legacy/file/MimeType';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file_format_has_mime_type'
})
export class FileFormatHasMimeType extends Model<FileFormatHasMimeType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => FileFormat)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	fileFormatQid: number;

	@ForeignKey(() => MimeType)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	mimeTypeQid: string;
}
