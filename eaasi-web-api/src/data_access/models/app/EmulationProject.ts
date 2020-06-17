import { CreatedAt, UpdatedAt, Column, Table, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EmulationProjectResource } from '.';
import { EaasiUserOwnedModel } from './base-models/EaasiIUserOwnedModel';

@Table({
	tableName: 'emulation_project'
})
export class EmulationProject extends EaasiUserOwnedModel {
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

	@HasMany(() => EmulationProjectResource, 'emulationProjectId')
    resources: EmulationProjectResource[]
}
