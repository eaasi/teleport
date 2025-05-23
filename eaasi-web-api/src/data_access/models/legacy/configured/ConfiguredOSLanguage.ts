import { ConfiguredOS } from '@/data_access/models/legacy/configured/ConfiguredOS';
import { Language } from '@/data_access/models/legacy/base/Language';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_os_language'
})
export class ConfiguredOSLanguage extends Model<ConfiguredOSLanguage> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredOS)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredOsID: number;

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	languageQid: string;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isPrimaryLanguage: boolean;
}
