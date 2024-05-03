export interface IEaasClient extends IEventTarget {
	guac: any; // Guacamole.Client
	params?: IEaasClientParamaters;
	eventSource: EventSource;
	setXpraConf(width: number, height: number, dpi: number, xpraEncoding: string): void;
	getActiveSession(): IComponentSession;
	checkpoint(requestData: any): Promise<void>;
	disconnect(): Promise<void>;
	attachNewEnv(sessionId: string, container: HTMLElement, environmentRequest: any): Promise<void>;
	attach(sessionId: string, container: HTMLElement, componentId?: string): Promise<void>;
	start(components: IEaasStartObject[], options?: IStartEnvironmentParams ): Promise<void>;
	load(session: IComponentSession): void;
	release(destroyNetworks?: boolean): Promise<any>;
	getSession(id: string): IComponentSession;
	getSessions(): IComponentSession[];
	connect(container: HTMLElement, view?: any): Promise<void>;
	detach(name: string, detachTime_minutes: number): Promise<void>;
	stop(): any;
	onEmulatorStopped(): void;
}

export interface IEventTarget {
	addEventListener(type: string, listener: any, options?: any): void;
	dispatchEvent(event: string): boolean;
	removeEventListener(type: string, listener: any): void;
}

export interface IEaasStartObject extends IContainerComponentRequest{
	visualize?: boolean;
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
	type: string;
	userId?: string;
	input_data?: IComponentInputMedium[];
}

export interface IContainerComponentRequest extends IComponentRequest {
	environment: string;
	archive: string;
}

export interface ITcpGatewayConfig {
	socks?: boolean;
	serverPort: string;
	serverIp: string;
	localMode: boolean;
}

export interface INetworkComponentConfig {
	componentId?: string;
	networkLabel?: string;
	hwAddress: string;
	fqdn?: any;
	serverIp?: any;
	serverPorts?: any;
}

export interface INetworkConfig {
	_enableInternet: boolean;
	dhcpEnabled: boolean;
	gateway?: any;
	network?: any;
	dhcpNetworkAddress?: string;
	dhcpNetworkMask?: string;
	tcpGatewayConfig?: ITcpGatewayConfig;
	components: INetworkComponentConfig[];
}

export interface IMachineComponentRequest extends IComponentRequest {
	archive: string;
	input_data?: IComponentInputMedium[];
	environment: string;
	keyboardLayout: string;
	keyboardModel: string;
	object?: string;
	objectArchive?: string;
	software?: string;
	lockEnvironment?: boolean;
	emulatorVersion?: string;
}

// This maps to the second argument of IEaasClient.start()
export interface IStartEnvironmentParams {
	_networkEnabled?: boolean;
	networkConfig?: INetworkConfig;
	xpraEncoding?: string;
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
	uploadedItemList: any[];
	status: string;
	uploads: string[];
}

export interface IComponentSession {
	createComponent(componentRequest: any, api: string, idToken: string): Promise<any>;
	setNetwork(network: any): void;
	getId(): string;
	setSessionRequestInfo(req: any): void;
	getNetwork(): any;
	hasSharedNetworkPorts(): boolean;
	getProxyURL(serverIp?: string, serverPort?: string, gatewayIP?: string, localPort?: string, localIP?: string): Promise<string>;
	setRemovableMediaList(mediaList: any): void;
	getRemovableMediaList(): any;
	createSnapshot(snapshotBuilder: any): Promise<any>;
	snapshot(postObj: any, networkEnvironmentId: string): Promise<any>;
	changeMedia(postObj: any): Promise<any>;
	getControlUrl(): Promise<any>;
	keepalive(): Promise<void>;
	getEmulatorState(): Promise<any>;
	disconnect(): void;
	stop(): Promise<any>;
	release(): Promise<void>;
	getContainerResultUrl(): Promise<any>;
	checkpoint(): Promise<any>;
	downloadPrint(label: string): any;
	getPrintJobs(): Promise<any>;
	hasPointerLock(): boolean;
	setPointerLock(): void;
}