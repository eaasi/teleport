import MachineInterface from '@/data_access/models/machine/MachineInterface';
import ProcessorDevice from '@/data_access/models/processor/ProcessorDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'processor_device_has_machine_interface'
})
export default class ProcessorDeviceHasMachineInterface extends Model<ProcessorDeviceHasMachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ProcessorDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	processorDeviceID;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	machineInterfaceID;
}
