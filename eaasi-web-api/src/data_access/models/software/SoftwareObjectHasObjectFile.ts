import File from '@/data_access/models/file/file';
import SoftwareObject from '@/data_access/models/software/SoftwareObject';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_object_has_object_file'
})
export default class SoftwareObjectHasObjectFile extends Model<SoftwareObjectHasObjectFile> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	softwareObjectID: number;

	@ForeignKey(() => File)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	fileID: number;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	softwareObjectFileLabel: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	softwareObjectFileMediaTypeName: string;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	softwareObjectFileOrder: number;
}
