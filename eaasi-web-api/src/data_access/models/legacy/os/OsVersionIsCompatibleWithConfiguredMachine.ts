import { ConfiguredMachine } from '@/data_access/models/legacy/configured/ConfiguredMachine';
import { OsVersion } from '@/data_access/models/legacy/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_compatible_with_configured_machine'
})
export class OsVersionIsCompatibleWithConfiguredMachine extends Model<OsVersionIsCompatibleWithConfiguredMachine> {
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

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredMachineID: number;
}
