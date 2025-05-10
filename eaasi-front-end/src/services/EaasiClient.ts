import { createClientV1alpha } from '@eaasi/sdk-ts';
import config from '@/config';

class EaasiClientSingleton {
	private static instance: EaasiClientSingleton;
	private client: ReturnType<typeof createClientV1alpha>;

	private constructor() {
		this.client = createClientV1alpha({
			baseUrl: config.BASE_CLIENT_URL + '/api/v1alpha',
		});
	}

	public static getInstance(): EaasiClientSingleton {
		if (!EaasiClientSingleton.instance) {
			EaasiClientSingleton.instance = new EaasiClientSingleton();
		}
		return EaasiClientSingleton.instance;
	}

	public async get<TResponse>(path: string): Promise<TResponse> {
		try {
			const response = await this.client.GET<unknown, unknown>(path);

			if (response.error) {
				throw new Error(response.error.message || 'Unknown error');
			}

			return response.data;
		} catch (err) {
			console.error('EaasiClient GET error:', err);
			throw err;
		}
	}
}

const instance = EaasiClientSingleton.getInstance();
export default instance;