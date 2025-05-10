import { createClientV1alpha } from '@eaasi/sdk-ts';
import config from '@/config';

const client = createClientV1alpha({
	baseUrl: config.API_URL,
});

// TODO: Add authentication middleware

export default client;