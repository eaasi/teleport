import { Language } from '@/data_access/models/legacy/base/Language';
import { OsVersion } from '@/data_access/models/legacy/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_language_settings'
})
export class OsVersionLanguageSettings extends Model<OsVersionLanguageSettings> {
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

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	languageQID: string;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isDefaultLanguage: boolean
}
