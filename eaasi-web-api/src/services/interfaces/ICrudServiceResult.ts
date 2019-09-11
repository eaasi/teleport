export default interface ICrudServiceResult {
	readonly hasError: boolean;
	readonly result?: any;
	readonly error?: string | Error | null;
}
