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
	log(info: any, callback: any) {
		const log = () => {
			const data = {
				message: info.message,
				level: info.level
			};

			this.model.create(data)
				.then((log: any) => {
					this.emit('logged');
					callback(null, log.get());
				}).catch((err: any) => {
					this.emit('error', err);
					callback(err);
				});
		};

		return log();
	}
}
