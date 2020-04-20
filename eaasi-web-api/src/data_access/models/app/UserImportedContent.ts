import {EaasiUser} from '@/data_access/models/app/EaasiUser';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'imported_content'
})
export class UserImportedContent extends Model<UserImportedContent> {
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
    	type: DataTypes.INTEGER,
    	allowNull: false,
    })
    userID: number;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: true,
    })
    eaasiID: string;
}
