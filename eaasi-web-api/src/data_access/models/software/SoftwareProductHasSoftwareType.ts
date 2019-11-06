import SoftwareProduct from '@/data_access/models/software/SoftwareProduct';
import SoftwareType from '@/data_access/models/software/SoftwareType';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_product_has_software_type'
})
export default class SoftwareProductHasSoftwareType extends Model<SoftwareProductHasSoftwareType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareProduct)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareProductID: number

	@ForeignKey(() => SoftwareType)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	softwareTypeQID: string
}
