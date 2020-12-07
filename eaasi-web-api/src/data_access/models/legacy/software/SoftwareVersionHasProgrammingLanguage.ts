import { ProgrammingLanguage } from '@/data_access/models/legacy/base/ProgrammingLanguage';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_programming_language'
})
export class SoftwareVersionHasProgrammingLanguage extends Model<SoftwareVersionHasProgrammingLanguage> {
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

	@ForeignKey(() => ProgrammingLanguage)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	programmingLanguageID: number;
}

