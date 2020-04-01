import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'eaasi_user_hash'
})
export class EaasiUserHash extends Model<EaasiUserHash> {

	@CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
	updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true
    })
    userId: number;

    @Column({
    	allowNull: false,
    	type: DataTypes.STRING(9999)
    })
    hash: string;
    
}
