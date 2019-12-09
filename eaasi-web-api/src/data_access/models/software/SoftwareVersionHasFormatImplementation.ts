import { FormatImplementation } from '@/data_access/models/file/FormatImplementation';
import { FormatOperation } from '@/data_access/models/file/FormatOperation';
import { SoftwareVersion } from '@/data_access/models/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_format_implementation'
})
export class SoftwareVersionHasFormatImplementation extends Model<SoftwareVersionHasFormatImplementation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionID: number;

	@ForeignKey(() => FormatImplementation)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	formatImplementationID: number;

	@ForeignKey(() => FormatOperation)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	formatOperationID: number;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isDefaultImplementation: boolean;
}

