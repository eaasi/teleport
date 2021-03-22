import { IEnvironment } from '@/types/Resource';
import { ClientOptions, TcpGatewayConfig } from '../../../../../eaas-client/lib/clientOptions.js';

export default class StartEnvironmentParams extends ClientOptions {
	constructor(env: IEnvironment) {
		super();

		super.setXpraEncoding(env.xpraEncoding);

		if (!env.networking) {
			return;
		}

		const networkConfig = super.getNetworkConfig();
		networkConfig.enableInternet(env.networking.enableInternet);
		super.enableNetworking(env.networking.connectEnvs);

		const tcpGatewayConfig = new TcpGatewayConfig(env.networking.serverIp, env.networking.serverMode);
		tcpGatewayConfig.enableSocks(env.networking.enableSocks);
		networkConfig.setTcpGatewayConfig(tcpGatewayConfig);
	}
}