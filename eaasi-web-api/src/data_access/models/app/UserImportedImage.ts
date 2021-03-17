import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'user_imported_image'
})
export class UserImportedImage extends Model<UserImportedImage> {
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
