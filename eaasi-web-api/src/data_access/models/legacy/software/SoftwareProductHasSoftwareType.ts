import { SoftwareProduct } from '@/data_access/models/legacy/software/SoftwareProduct';
import { SoftwareType } from '@/data_access/models/legacy/software/SoftwareType';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_product_has_software_type'
})
export class SoftwareProductHasSoftwareType extends Model<SoftwareProductHasSoftwareType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareProduct)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareProductID: number;

	@ForeignKey(() => SoftwareType)
	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	softwareTypeQid: string;
}
