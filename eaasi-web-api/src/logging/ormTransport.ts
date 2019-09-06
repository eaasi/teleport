'use strict';

import Transport from 'winston-transport';

/**
 * Custom Winston Transport for persisting logs to database via ORM
 */
export default class OrmTransport extends Transport {
	/**
	 * Database model
	 */
	protected model: any;

	/**
	 * Application source of logged event
	 */
	protected source: string;

	constructor(options: any, source: string) {
		super(options);
		this.source = source;
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
				level: info.level,
				source: this.source,
			};

			console.log(data);

			// this.model.create(data)
			// 	.then((log: any) => {
			// 		this.emit('logged');
			// 		callback(null, log.get());
			// 	}).catch((err: any) => {
			// 		this.emit('error', err);
			// 		callback(err);
			// 	});
		};

		return log();
	}
}
