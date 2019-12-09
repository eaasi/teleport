import { ConfiguredMachine } from '@/data_access/models/configured/ConfiguredMachine';
import { MachineInterface } from '@/data_access/models/machine/MachineInterface';
import { PointerDevice } from '@/data_access/models/pointer/PointerDevice';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_pointer_device'
})
export class ConfiguredPointerDevice extends Model<ConfiguredPointerDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredMachineID: number;

	@ForeignKey(() => PointerDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	pointerDeviceID: number;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	uses_machineInterfaceID: boolean;
}
