import { Response } from 'node-fetch';

/* eslint-disable semi */
export default interface IHttpService {
	get(url: string): Promise<Response>;
	post(url: string, data: any, options?: any): Promise<Response>;
	patch(url: string, data: any, options?: any): Promise<Response>;
	delete(url: string, data?: any): Promise<Response>;
	postUpload(url: string, data: any, options?: any): Promise<Response>;
}
