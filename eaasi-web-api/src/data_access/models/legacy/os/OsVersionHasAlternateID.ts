import { OsVersion } from '@/data_access/models/legacy/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_has_alternate_id'
})
export class OsVersionHasAlternateID extends Model<OsVersionHasAlternateID> {
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

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	osVersionAlternateID: number;
}

