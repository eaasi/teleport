import SoftwareProduct from '@/data_access/models/software/SoftwareProduct';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_product_has_alternate_name'
})
export default class SoftwareProductHasAlternateName extends Model<SoftwareProductHasAlternateName> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareProduct)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareProductID: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	alternateName: string;
}
