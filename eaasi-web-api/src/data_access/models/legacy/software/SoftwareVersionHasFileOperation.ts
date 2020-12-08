import { FileOperation } from '@/data_access/models/legacy/file/FileOperation';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_file_operation'
})
export class SoftwareVersionHasFileOperation extends Model<SoftwareVersionHasFileOperation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionID: number;

	@ForeignKey(() => FileOperation)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	fileOperationID: number;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	fileOperationType: string;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isDefaultOperation: boolean;
}

