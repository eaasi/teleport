import { ConfiguredSoftware } from '@/data_access/models/legacy/configured/ConfiguredSoftware';
import { FormatImplementation } from '@/data_access/models/legacy/file/FormatImplementation';
import { FormatOperation } from '@/data_access/models/legacy/file/FormatOperation';
import { DataTypes } from 'sequelize';
import {Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt} from 'sequelize-typescript';

@Table({
	tableName: 'configured_software_uses_format_implementation'
})
export class ConfiguredSoftwareUsesFormatImplementation extends Model<ConfiguredSoftwareUsesFormatImplementation> {
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
}
