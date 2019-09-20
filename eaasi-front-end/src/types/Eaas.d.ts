import { IEnvironment } from './Resource';

export interface IEaasClient {
	guac: any, // Guacamole.Client
	params?: IEaasiClientParamaters;
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
	onError(error: string): void;
	pollState(): void;
	prepareAndLoadWebEmulator(url: string): void;
	prepareAndLoadXpra(xpraUrl: string): void;
	release(): Promise<any>;
	sendCtrlAltDel(): Promise<void>;
	sendEsc(): void;
	snashot(postObj: any, onChangeDone: Function, errorFn: Function);
	start(environments: IEnvironment[], args?: Object, attachId?: string): Promise<void>;
	startAndAttach(environments: IEnvironment[], args?: Object, attachId?: string): Promise<void>;
	startContainer(containerId: string, args?: Object): Promise<void>;
	startDockerEnvironment(environmentID: string, args?: Object);
	startEnvironment(environmentID: string, args?: Object) : Promise<void>;
	wsConnection(): Promise<any>;
}

export interface IEaasiClientParamaters {
	pointerLock: boolean | string;
}

export interface IbwflaController {
	hideClientCursor(guac: any): void;
	showClientCursor(guac: any): void;
	registerEventCallback(target: any, eventName: string, callback: Function): void;
	requestPointerLock(target: any, event)
	unregisterEventCallback(target: any, eventName: string, callback: Function): void;
}