import { UserInformation } from '@/data_access/models/legacy/base/UserInformation';
import { ConfiguredSoftware } from '@/data_access/models/legacy/configured/ConfiguredSoftware';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_software_has_user_information'
})
export class ConfiguredSoftwareHasUserInformation extends Model<ConfiguredSoftwareHasUserInformation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredSoftware)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredSoftwareVersionID: number;

	@ForeignKey(() => UserInformation)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	userInformationID: number;
}
