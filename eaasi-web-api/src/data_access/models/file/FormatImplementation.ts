import { FileExtension } from '@/data_access/models/file/FileExtension';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'format_implementation'
})
export class FormatImplementation extends Model<FormatImplementation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataTypes.STRING(32),
		allowNull: false
	})
	name: string;

	@ForeignKey(() => FileExtension)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	fileExtensionID: number;
}
