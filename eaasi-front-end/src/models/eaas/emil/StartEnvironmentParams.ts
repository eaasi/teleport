import { IEnvironment } from '@/types/Resource';
import { ClientOptions, TcpGatewayConfig } from 'EaasClient/lib/clientOptions.js';

export default class StartEnvironmentParams extends ClientOptions {
	constructor(env: IEnvironment) {
		super();

		super.setXpraEncoding(env.xpraEncoding);

		if (!env.networking) {
			return;
		}
		super.getNetworkConfig().enableInternet(env.networking.enableInternet);
		super.getNetworkConfig().setGateway(env.gateway);
		super.getNetworkConfig().setNetwork(env.network);
		super.enableNetworking(env.networking.connectEnvs);
		try {
			const tcpGatewayConfig = new TcpGatewayConfig(env.networking.serverIp, env.networking.serverMode);
			tcpGatewayConfig.enableSocks(env.networking.enableSocks);
			tcpGatewayConfig.enableLocalMode(env.networking.localServerMode);
			super.getNetworkConfig().setTcpGatewayConfig(tcpGatewayConfig);
		} catch (e) {
			// do nothing
		}
	}
}