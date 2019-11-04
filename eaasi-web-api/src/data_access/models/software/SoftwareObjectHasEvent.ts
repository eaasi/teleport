import SoftwareObject from '@/data_access/models/software/SoftwareObject';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_object_has_event'
})
export default class SoftwareObjectHasEvent extends Model<SoftwareObjectHasEvent> {
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

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	eventID: number;
}
