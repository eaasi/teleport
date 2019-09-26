import { IStartEnvironmentParams, ITCPGatewayConfig } from '@/types/Eaas';
import { IEnvironment } from '@/types/Resource';

export default class StartEnvironmentParams implements IStartEnvironmentParams {
	enableNetwork: boolean;
	hasTcpGateway: boolean;
	hasInternet: boolean;
	xpraEncoding: string;
	tcpGatewayConfig: ITCPGatewayConfig;

	constructor(env: IEnvironment) {
		this.xpraEncoding = env.xpraEncoding;
		if(!env.networking) return;

		this.hasInternet = env.networking.enableInternet;
		if (env.networking.connectEnvs) this.enableNetwork = true;
		this.hasTcpGateway = env.networking.localServerMode ? false : env.networking.serverMode;

		if (this.hasTcpGateway || env.networking.localServerMode) {
			this.tcpGatewayConfig = {
				socks: env.networking.enableSocks,
				serverPort: env.networking.serverPort,
				serverIp: env.networking.serverIp
			};
		}
	}
}