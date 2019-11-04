'use strict';

const Sequelize = require('sequelize');

class PointerDeviceType extends Sequelize.Model {}
module.exports = (sequelize) => {
	PointerDeviceType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		pointerDeviceTypeID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		pointerDeviceTypeLabel: {
			type: Sequelize.STRING,
			allowNull: false
		},
		pointerDeviceTypeQID: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'pointerDeviceType' });

	return PointerDeviceType;
};

import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'pointer_device_type'
})
export default class PointerDeviceType extends Model<PointerDeviceType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	qid: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	label: number

	@ForeignKey(() => PointerDeviceType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	pointerDeviceType: number
}
