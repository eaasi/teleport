import FileFormat from '@/data_access/models/file/FileFormat';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file'
})
export default class File extends Model<File> {
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
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	location: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	checkSum: string

    @ForeignKey(() => FileFormat)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	fileFormatId: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
    size: string
}
