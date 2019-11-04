import SoftwareObject from '@/data_access/models/software/SoftwareObject';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_object_has_alternate_id'
})
export default class SoftwareObjectHasAlternateID extends Model<SoftwareObjectHasAlternateID> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	softwareObjectID: number;

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	softwareObjectAlternateID: number;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	softwareObjectAlternateIDSource: number;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	isLocalID: boolean;
}
