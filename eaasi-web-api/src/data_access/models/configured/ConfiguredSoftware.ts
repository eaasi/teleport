import Language from '@/data_access/models/base/Language';
import ContentObject from '@/data_access/models/content/ContentObject';
import SoftwareObject from '@/data_access/models/software/SoftwareObject';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_software'
})
export default class ConfiguredSoftware extends Model<ConfiguredSoftware> {
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

	@Column({
		type: DataTypes.STRING(256),
		allowNull: true,
	})
	executableLocation: string

	@Column({
		type: DataTypes.STRING(32),
		allowNull: true,
	})
	executableSyntax: string

	@Column({
		type: DataTypes.STRING(256),
		allowNull: true,
	})
	saveLocation: string

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	languageQid: string

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	hasSource_softwareObjectID: number

	@ForeignKey(() => ContentObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	hasSource_contentObjectLocalID: number

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	manifestation_of_softwareVersion: number
}
