import ICrudServiceResult from '../interfaces/ICrudServiceResult';

/**
 * Default CRUD Service success result object.  CRUD Services should return
 * a CrudServiceResult when a CRUD operation is successful
 */
export default class CrudServiceResult<T> implements ICrudServiceResult<T> {
	readonly result?: T;

	readonly error: string | Error | null;

	readonly hasError: boolean;

	constructor(error: string | Error | null, result?: T) {
		this.error = error;
		this.result = result;
		this.hasError = !!error;
	}
}
