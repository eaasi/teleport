import Language from '@/data_access/models/base/Language';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_language_settings'
})
export default class SoftwareVersionHasLanguageSettings extends Model<SoftwareVersionHasLanguageSettings> {
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

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	languageQid: string;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isDefaultLanguage: boolean;
}

