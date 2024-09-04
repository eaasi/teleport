import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'emulation_project'
})
export class EaasiUserOwnedModel extends Model {
	@Column({
    	type: DataTypes.STRING(50),
    	allowNull: false,
	})
	userId: string;
}
