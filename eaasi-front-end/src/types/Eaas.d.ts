export interface IEaasClient {
	guac: any, // Guacamole.Client
	params?: IEaasClientParamaters;
	componentId: string;
	connect(): Promise<void>;
	changeMedia(postObj: any, onChangeDone: Function): void;
	checkpoint(requestData: any): Promise<void>;
	detach(name: string, detachTime_minutes: number, customComponentName: string): Promise<void>;
	disconnect(): Promise<void>;
	downloadPrint(label: string): string;
	establishGuacamoleTunnel(controlUrl: string): any;
	getContainerResultUrl(): string;
	getEmulatorState(): Promise<void>;
	getPrintJobs(successFn: Function, errorFn: Function): void;
	getProxyURL(): Promise<string>;
	getScreenshotUrl(): string;
	keepAlive(): void;
	onEmulatorStopped(): void;
	onError(error: string): void;
	pollState(): void;
	prepareAndLoadWebEmulator(url: string): void;
	prepareAndLoadXpra(xpraUrl: string): void;
	release(): Promise<any>;
	sendCtrlAltDel(): Promise<void>;
	sendEsc(): void;
	snapshot(postObj: any, onChangeDone: Function, errorFn: Function);
	start(componentw: IEaasStartObject[], args?: IStartEnvironmentParams, attachId?: string): Promise<void>;
	startAndAttach(components: IEaasStartObject[], args?: IStartEnvironmentParams, attachId?: string): Promise<void>;
	startContainer(containerId: string, args?: any): Promise<void>;
	startDockerEnvironment(environmentID: string, args?: any);
	startEnvironment(environmentID: string, args?: IStartEnvironmentParams) : Promise<void>;
	wsConnection(): Promise<any>;
}

export interface IEaasStartObject {
	data: IContainerComponentRequest;
	vizualize?: boolean;
}

export interface IComponentInputMedium {
	type: 'hdd' | 'cdrom';
	partition_table_type: 'mbr' | 'gbt' | 'none';
	filesystem_type: FileSystemType;
	size_mb: number;
	destination: string;
	extfiles: string[];
}

export type FileSystemType = 'fat16' | 'fat32' | 'vfat' | 'ntfs' | 'ext2' | 'ext3' | 'ext4' | 'iso9660';

export interface IComponentRequest {
	type: 'machine' | 'container' | 'slirp' | 'socks';
	userId?: string;
	input_data: IComponentInputMedium[];
}

export interface IContainerComponentRequest extends IComponentRequest {
	environment: string;
	archive: string;
}

export interface IMachineComponentRequest extends IComponentRequest {
	archive: string;
	input_data: IComponentInputMedium[];
	environment: string;
	keyboardLayout: string;
	keyboardModel: string;
	object?: null;
	objectArchive?: string;
	software?: string;
	lockEnvironment: boolean;
	emulatorVersion?: string;
}

// This maps to the second argument of IEaasClient.start()
export interface IStartEnvironmentParams {
	enableNetwork: boolean;
	hasTcpGateway: boolean;
	hasInternet: boolean;
	tcpGatewayConfig: ITCPGatewayConfig
	xpraEncoding: string;
}

export interface ITCPGatewayConfig {
	socks: any;
	serverPort: string | number;
	serverIp: string;
}

export interface IisLinuxRuntimeData {
	userContainerEnvironment: any,
	userContainerArchive: any,
	isDHCPenabled: boolean
}

export interface IEaasClientParamaters {
	pointerLock: boolean | string;
}

export interface IbwflaController {
	hideClientCursor(guac: any): void;
	showClientCursor(guac: any): void;
	registerEventCallback(target: any, eventName: string, callback: Function): void;
	requestPointerLock(target: any, event)
	unregisterEventCallback(target: any, eventName: string, callback: Function): void;
}

/**
 * Provided as a response from [POST] /emil/upload
 */
export interface IEmilUploadResponse {
	status: string;
	uploads: string[];
}