import { SoftwareObject } from '@/data_access/models/software/SoftwareObject';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_object_has_alternate_id'
})
export class SoftwareObjectHasAlternateID extends Model<SoftwareObjectHasAlternateID> {
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
		type: DataTypes.STRING(128),
		allowNull: true,
	})
	alternateIdSource: number;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	isLocalID: boolean;
}
