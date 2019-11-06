import Language from '@/data_access/models/base/Language';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_language_settings'
})
export default class SoftwareVersionLanguageSettings extends Model<SoftwareVersionLanguageSettings> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionID: number

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	languageQID: string
}

