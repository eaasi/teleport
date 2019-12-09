import IImportedSoftwareResource from '@/types/resource/ImportedSoftwareResource';
import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'imported_software_resource'
})
export class ImportedSoftwareResource extends Model<ImportedSoftwareResource> implements IImportedSoftwareResource {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true
    })
    readonly id: number;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: true,
    })
    eaasiID: string;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: true,
    })
    environmentTemplateId: string;

    @Column({
    	type: DataTypes.STRING(128),
    	allowNull: false,
    })
    name: string;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: true,
    })
    localIdentifier: string;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: true,
    })
    localIdentifierSource: string;

    @Column({
    	type: DataTypes.STRING(32),
    	allowNull: true,
    })
    version: string;

    @Column({
    	type: DataTypes.BOOLEAN,
    	allowNull: false,
    	defaultValue: false
    })
    isUrlSource: boolean;

    @Column({
    	type: DataTypes.STRING,
    	allowNull: true,
    })
    urlSource: string;
}
