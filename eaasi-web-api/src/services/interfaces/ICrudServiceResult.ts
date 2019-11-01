export default interface ICrudServiceResult<T> {
	readonly hasError: boolean;

	// TODO: result => data?
	readonly result?: T;

	readonly error?: string | Error | null;
}
