import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Table, UpdatedAt } from 'sequelize-typescript';
import { EaasiUserOwnedModel } from './base-models/EaasiIUserOwnedModel';

@Table({
	tableName: 'temp_environment'
})
export class TempEnvironment extends EaasiUserOwnedModel {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.NUMBER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true
    })
    readonly id: number;

    @Column({
    	type: DataTypes.STRING,
    	allowNull: false,
    })
    envId: string;
    
}
