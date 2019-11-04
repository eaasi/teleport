import ChipSet from '@/data_access/models/base/chipSet';
import MachineType from '@/data_access/models/machine/machineType';
import ProcessorDevice from '@/data_access/models/processor/processorDevice';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_machine'
})
export default class ConfiguredMachine extends Model<ConfiguredMachine> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	description: string

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	datetime: Date

    @ForeignKey(() => MachineType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	machineTypeID: Date

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
    RAM: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	RAMUnit: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	CpuCores: number

    @ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	EmulatorSoftwareID: number

	@ForeignKey(() => ProcessorDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
    ProcessorDeviceID: number

	@ForeignKey(() => ChipSet)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	ChipsetID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	ROMFileID: number
}
