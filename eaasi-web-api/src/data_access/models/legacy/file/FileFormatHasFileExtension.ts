import { FileExtension } from '@/data_access/models/legacy/file/FileExtension';
import { FileFormat } from '@/data_access/models/legacy/file/FileFormat';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file_format_has_file_extension'
})
export class FileFormatHasFileExtension extends Model<FileFormatHasFileExtension> {
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

    @ForeignKey(() => FileExtension)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	fileExtensionID: number;
}
