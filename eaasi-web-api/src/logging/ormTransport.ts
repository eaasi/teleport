'use strict';

import { ApplicationLog } from '@/data_access/models/app/ApplicationLog';
import Transport from 'winston-transport';

/**
 * Custom Winston Transport for persisting logs to database via ORM
 */
export default class OrmTransport extends Transport {

	/**
	 * Model
	 */
	protected model: any;

	constructor(model: any = ApplicationLog) {
		super();
		this.model = model;
	}

	/**
	 * Transport.log override
	 * @param info
	 * @param callback
	 */
	async log(info: ILogEntry, callback: Function = null) {
		try {
			const data = {
				message: info.message,
				level: info.level
			};
			const logEntry = await this.model.create(data);
			if (!logEntry) throw new Error(`failed persisting log ${data.message}`);
			this.emit('logged');
			if (callback) callback(null, logEntry.get());
		} catch(err) {
			this.emit('error', err);
			if (callback) callback(err);
		}
	}
}

export interface ILogEntry {
	message: string;
	level: string;
}