import { IDrive, IDriveSetting, IEaasiResource, IEnvironment, ResourceType } from '@/types/Resource';
import {resourceTypes, translatedIcon} from '@/utils/constants';

export type IEnvironmentUpdateRequest = {
    containerEmulatorName: string;
    containerEmulatorVersion: string;
    description: string;
	drives: IDrive[];
	driveSettings: IDriveSetting[];
    enablePrinting: boolean;
    enableRelativeMouse: boolean;
    envId: string;
    linuxRuntime: boolean;
    nativeConfig: string;
    networking: any;
    os?: string;
    processAdditionalFiles: boolean;
    shutdownByOs: boolean;
    time: number;
    title: string;
    useWebRTC: boolean;
    useXpra: boolean;
    xpraEncoding: string;
}

export interface IReplicateEnvironmentRequest {
	destArchive: ArchiveType;
	replicateList: string[];
}

export interface ISaveEnvironmentResponse {
	status: string;
	taskList: string[];
}

type ArchiveType = 'remote' | 'public' | 'private';

export function getResourceId(resource: IEaasiResource): string {
	if(resource.resourceType === resourceTypes.ENVIRONMENT) return resource.envId;
	return resource.id;
}

export function getResourceArchiveId(resource: IEaasiResource): string {
	if(resource.resourceType === resourceTypes.ENVIRONMENT) return resource.archive;
	return resource.archiveId;
}

export function getResourceTypeTags(resource: IEaasiResource) {
	if(resource.resourceType === resourceTypes.SOFTWARE) {
		return [{
			text:'Software',
			icon: translatedIcon('disk'),
			color:'white'
		}];
	}
	if(resource.resourceType === resourceTypes.CONTENT) {
		return [{
			text: 'Content',
			icon: translatedIcon('file'),
			color:'white'
		}];
	}
	if(resource.resourceType === resourceTypes.ENVIRONMENT) {
		return [{
			text: resourceTypes.ENVIRONMENT as string,
			icon: translatedIcon('config-environment'),
			color: 'white'
		}];
	}
	if(resource.resourceType === resourceTypes.IMAGE) {
		if (resource.isEmpty) {
			return [{
				text: 'Empty',
				icon: translatedIcon('disk'),
				color: 'white'
			}];
		}
		return [{
			text: resourceTypes.IMAGE as string,
			icon: translatedIcon('disk'),
			color: 'white'
		}];
	}
	return [];
}

export function getEnvironmentResourceTypeTags(environmentResource: IEaasiResource) {
	const tags = [];
	if (environmentResource.hasOwnProperty('envType')) {
		if (environmentResource['envType'] === 'base') {
			tags.push({
				icon: translatedIcon('config-environment'),
				color: 'white',
				text: 'Base'
			});
		}
		if (environmentResource['envType'] === 'object') {
			tags.push({
				icon: translatedIcon('file-container'),
				color: 'white',
				text: 'Object'
			});
		}
	}
	return tags;
}

export function filterResourcesByType(resources: IEaasiResource[], type: ResourceType) {
	if(!Array.isArray(resources)) return [];
	return resources.filter(x => x.resourceType === type);
}

export function removeResourcesByType(resources: IEaasiResource[], types: ('Environment' | 'Software' | 'Content' | 'Image')[]) {
	if(!Array.isArray(resources)) return [];
	return resources.filter(x => !types.includes(x.resourceType));
}

export function mapEnvironmentToEnvironmentUpdateRequest(environment: IEnvironment): IEnvironmentUpdateRequest {
    return {
		containerEmulatorName: environment.containerName,
		containerEmulatorVersion: environment.containerVersion,
        description: environment.description,
        drives: environment.drives.length > 0 ? _mapDrives(environment.drives) : [],
        enablePrinting: environment.enablePrinting,
        enableRelativeMouse: environment.enableRelativeMouse,
        envId: environment.envId,
        linuxRuntime: environment.linuxRuntime,
        nativeConfig: environment.nativeConfig,
        networking: environment.networking,
        os: environment.os,
        processAdditionalFiles: environment.processAdditionalFiles,
        shutdownByOs: environment.shutdownByOs,
        time: environment.time,
        title: environment.title,
        useWebRTC: environment.useWebRTC,
        useXpra: environment.useXpra,
		xpraEncoding: environment.xpraEncoding,
		driveSettings: environment.driveSettings,
    } as IEnvironmentUpdateRequest;
}

function _mapDrives(drives: IDrive[]) {
    return drives.map(drive => {
        return {
            data: drive.data,
            iface: drive.iface,
            filesystem: drive.filesystem,
            bus: drive.bus,
            unit: drive.unit,
            type: drive.type,
            boot: drive.boot,
            plugged: drive.plugged,
        };
    });
}