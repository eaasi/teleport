import ProgrammingLanguage from '@/data_access/models/base/ProgrammingLanguage';
import OsVersion from '@/data_access/models/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_has_programming_language'
})
export default class OsVersionHasProgrammingLanguage extends Model<OsVersionHasProgrammingLanguage> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	osVersionID: number;

	@ForeignKey(() => ProgrammingLanguage)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	programmingLanguageID: number;
}

