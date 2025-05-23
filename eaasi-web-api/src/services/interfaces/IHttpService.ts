import { Response } from 'node-fetch';

/* eslint-disable semi */
export default interface IHttpService {
	get(url: string, options?: any, token?: string): Promise<Response>;
	post(url: string, data?: any, options?: any, token?: string): Promise<Response>;
	patch(url: string, data: any, options?: any, token?: string): Promise<Response>;
	delete(url: string, data?: any, options?: any, token?: string): Promise<Response>;
	postUpload(url: string, data: any, options?: any, token?: string): Promise<Response>;
}
