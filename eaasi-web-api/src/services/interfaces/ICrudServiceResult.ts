export default interface ICrudServiceResult {
	readonly hasError: boolean;

	// TODO: result => data?
	readonly result?: any;

	readonly error?: string | Error | null;
}
