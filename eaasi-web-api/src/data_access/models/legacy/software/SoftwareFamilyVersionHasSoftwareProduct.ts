import { SoftwareProduct } from '@/data_access/models/legacy/software/SoftwareProduct';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_family_version_has_software_product'
})
export class SoftwareFamilyVersionHasSoftwareProduct extends Model<SoftwareFamilyVersionHasSoftwareProduct> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareFamilyVersionID: number;

	@ForeignKey(() => SoftwareProduct)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	hasPart_softwareProductID: number;
}
