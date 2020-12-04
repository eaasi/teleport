import { EaasiUserOwnedModel } from '@/data_access/models/app/base-models/EaasiIUserOwnedModel';
import { EaasiTask } from '@/data_access/models/app/EaasiTask';
import { EmulationProject } from '@/data_access/models/app/EmulationProject';
import { SuccessorType } from "@/types/task/Task";
import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
	tableName: 'emulation_project_task_successor'
})
export class EmulationProjectTaskSuccessor extends EaasiUserOwnedModel {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    updatedAt: Date = new Date();

    @ForeignKey(() => EaasiTask)
    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true
    })
    taskId: number;

    @ForeignKey(() => EmulationProject)
    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true
    })
    emulationProjectId: number;

    @Column({
    	type: DataTypes.STRING,
    	allowNull: false
    })
    envId: string;

    @BelongsTo(() => EaasiTask, {
    	foreignKey: 'taskId',
    	onDelete: 'CASCADE'
    })
    task: EaasiTask;
    
    @Column({
    	type: DataTypes.STRING,
    	allowNull: false
    })
    type: SuccessorType;
    
}
