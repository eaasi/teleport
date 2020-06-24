import { Writable } from 'stream';

export default class WritableStream extends Writable {

	payload: string = '';

	constructor(listener) {
		super();
		this.on('finish', listener);
	}

	_write(chunk, enc, next) {
		this.payload += chunk.toString();
		next();
	}

}