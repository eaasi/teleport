import { IEnvironment, IEnvironmentRevision } from '@/types/emil/EmilEnvironmentData';
import { ResourceType } from '@/types/resource/Resource';

export default class Environment implements IEnvironment {
	parentEnvId: string;
	envId: string;
	title: string;
	description: string;
	version?: string | undefined;
	emulator: string;
	helpText?: string | undefined;
	enableRelativeMouse: boolean;
	enablePrinting: boolean;
	shutdownByOs: boolean;
	timeContext?: any;
	serverMode: boolean;
	localServerMode: boolean;
	enableSocks: boolean;
	serverPort?: any;
	serverIp?: any;
	gwPrivateIp?: any;
	gwPrivateMask?: any;
	enableInternet: boolean;
	connectEnvs: boolean;
	author?: any;
	canProcessAdditionalFiles: boolean;
	archive: string;
	xpraEncoding?: any;
	owner: string;
	revisions: IEnvironmentRevision[];
	installedSoftwareIds: string[];
	userTag?: string | undefined;
	os?: string | undefined;
	nativeConfig: string;
	useXpra: boolean;
	envType: string;
	id: string | number;
	readonly resourceType: ResourceType = 'Environment';
}