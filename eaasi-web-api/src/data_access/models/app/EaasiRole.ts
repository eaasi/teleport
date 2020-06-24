import { CreatedAt, UpdatedAt, Column, Model, Table, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EaasiUser } from './EaasiUser';

@Table({
	tableName: 'eaasi_role'
})
export class EaasiRole extends Model<EaasiRole> {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true,
    })
    id: number;

    @Column({
    	type: DataTypes.STRING(32),
    	allowNull: false,
    	unique: true
    })
    roleName: string;

    @Column({
    	type: DataTypes.STRING(800),
    	allowNull: false
    })
    roleDescription: string;

	@HasMany(() => EaasiUser)
    users: EaasiUser[]
}
