import { Readable } from 'stream';

export class ReadableStream extends Readable {

	_object: Buffer;

	constructor(object: any) {
		super();
		var json = JSON.stringify(object);
		var buffer = Buffer.from(json);
		this._object = buffer;
	}

	_read = () => {
		this.push(this._object);
		this._object = null;
	};
}