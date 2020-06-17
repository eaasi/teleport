import {CreatedAt, UpdatedAt, Column, Table} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EaasiUserOwnedModel } from './base-models/EaasiIUserOwnedModel';

@Table({
	tableName: 'user_imported_environment'
})
export class UserImportedEnvironment extends EaasiUserOwnedModel {
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
    eaasiId: string;
}
