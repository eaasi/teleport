import { MachineInterface } from '@/data_access/models/legacy/machine/MachineInterface';
import { PointerDevice } from '@/data_access/models/legacy/pointer/PointerDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'pointer_device_has_machine_interface'
})
export class PointerDeviceHasMachineInterface extends Model<PointerDeviceHasMachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => PointerDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	pointerDeviceID: number

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	machineInterfaceID: number
}
