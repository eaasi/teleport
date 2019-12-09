import { FileFormat } from '@/data_access/models/file/FileFormat';
import { FileOperation } from '@/data_access/models/file/FileOperation';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file_operation_nearest_file_format'
})
export class FileOperationNearestFileFormat extends Model<FileOperationNearestFileFormat> {
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

	@ForeignKey(() => FileFormat)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	fileExtensionID: string;
}
