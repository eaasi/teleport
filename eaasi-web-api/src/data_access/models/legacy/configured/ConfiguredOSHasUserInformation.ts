import { UserInformation } from '@/data_access/models/legacy/base/UserInformation';
import { ConfiguredOS } from '@/data_access/models/legacy/configured/ConfiguredOS';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_os_has_user_information'
})
export class ConfiguredOSHasUserInformation extends Model<ConfiguredOSHasUserInformation> {
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

	@ForeignKey(() => UserInformation)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	userInformationID: number;
}
