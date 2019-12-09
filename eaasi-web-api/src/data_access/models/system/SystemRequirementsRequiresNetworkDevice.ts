import { NetworkDevice } from '@/data_access/models/network/NetworkDevice';
import { SystemRequirements } from '@/data_access/models/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_network_device'
})
export class SystemRequirementsRequiresNetworkDevice extends Model<SystemRequirementsRequiresNetworkDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SystemRequirements)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	systemRequirementsID: number;

	@ForeignKey(() => NetworkDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	networkDeviceID: number;
}

