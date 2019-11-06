import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'eaasi_role'
})
export default class EaasiRole extends Model<EaasiRole> {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    readonly updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true,
    })
    id: number

    @Column({
    	type: DataTypes.STRING,
    	allowNull: false,
    	unique: true
    })
    roleName: string

    @Column({
    	type: DataTypes.STRING(100),
    	allowNull: false
    })
    roleDescription: string
}
