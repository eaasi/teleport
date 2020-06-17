import { BelongsTo, CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EmulationProject } from './EmulationProject';
import { ResourceType } from '@/types/resource/Resource';

@Table({
	tableName: 'emulation_project_resource'
})
export class EmulationProjectResource extends Model<EmulationProjectResource> {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true
    })
    readonly id: number;

	@ForeignKey(() => EmulationProject)
	@Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
	})
    emulationProjectId: number;

	@Column({
    	type: DataTypes.STRING,
    	allowNull: false,
	})
	resourceId: string;

	@Column({
    	type: DataTypes.STRING,
    	allowNull: false,
	})
	resourceType: ResourceType

	@BelongsTo(() => EmulationProject, 'emulationProjectId')
	emulationProject: EmulationProject
}
