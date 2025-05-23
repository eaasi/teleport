import { GpuDevice } from '@/data_access/models/legacy/gpu/GpuDevice';
import { MachineInterface } from '@/data_access/models/legacy/machine/MachineInterface';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'gpu_device_has_machine_interface'
})
export class GpuDeviceHasMachineInterface extends Model<GpuDeviceHasMachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => GpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	gpuDeviceID: number;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	machineInterfaceID: number;
}
