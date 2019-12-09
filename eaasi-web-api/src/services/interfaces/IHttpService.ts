/* eslint-disable semi */
export default interface IHttpService {
	get(url: string): Promise<any>;
	post(url: string, data: any, options?: any): Promise<any>;
	delete(url: string): Promise<any>;
	postUpload(url: string, data: any, options?: any): Promise<any>;
}
