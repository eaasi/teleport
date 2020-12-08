import { FileFormat } from '@/data_access/models/legacy/file/FileFormat';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file'
})
export class File extends Model<File> {
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
	id: number;

	@Column({
		type: DataTypes.STRING(256),
		allowNull: false,
	})
	location: string;

	@Column({
		type: DataTypes.STRING(256),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	checkSum: string;

    @ForeignKey(() => FileFormat)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	fileFormatID: string;

	@Column({
		type: DataTypes.STRING(32),
		allowNull: true,
	})
    size: string;
}
