import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_alternate_id'
})
export class SoftwareVersionHasAlternateID extends Model<SoftwareVersionHasAlternateID> {
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

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionAlternateID: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	softwareVersionIdSource: string;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isLocalID: boolean;
}
