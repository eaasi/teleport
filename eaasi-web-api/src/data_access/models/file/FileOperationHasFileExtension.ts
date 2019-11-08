import FileExtension from '@/data_access/models/file/FileExtension';
import FileOperation from '@/data_access/models/file/FileOperation';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file_operation_has_file_extension'
})
export default class FileOperationHasFileExtension extends Model<FileOperationHasFileExtension> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => FileOperation)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	fileOperationID: number;

	@ForeignKey(() => FileExtension)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	fileExtensionID: number;
}
