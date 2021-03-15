import { EaasiUser } from '@/data_access/models/app/EaasiUser';
import { DataTypes } from 'sequelize';
import { Column, CreatedAt, ForeignKey, Table, UpdatedAt } from 'sequelize-typescript';
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

    @ForeignKey(() => EaasiUser)
    @Column({
    	type: DataTypes.STRING(50),
    	allowNull: false,
    })
    userId: string;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: false,
    })
    eaasiId: string;
}
