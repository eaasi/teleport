import { IDrive, IDriveSetting, IEaasiResource, IEnvironment, ISoftwarePackage, ResourceType } from '@/types/Resource';
import { ITag } from '@/types/Tag';
import { archiveTypes, resourceTypes } from '@/utils/constants';

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

export function getResourceLabel(resource: IEaasiResource) {
	switch(resource.resourceType) {
		case resourceTypes.SOFTWARE:
			return (resource as ISoftwarePackage).label;
		default:
			return resource.title;
	}
}

export function getResourceTypeTags(resource: IEaasiResource): ITag[] {
	if(resource.resourceType === resourceTypes.SOFTWARE) {
		return [{
			text:'Software',
			icon:'fa-browser',
			color:'white'
		}];
	}
	if(resource.resourceType === resourceTypes.CONTENT) {
		return [{
			text: 'Content',
			icon:'fa-file',
			color:'white'
		}];
	}
	if(resource.resourceType === resourceTypes.ENVIRONMENT) {
		let tags = [{
			text: resourceTypes.ENVIRONMENT as string,
			icon: 'fa-cube',
			color: 'white'
		}];
		if (resource.hasOwnProperty('envType')) {
			if (resource['envType'] === 'base') {
				tags.push({
					icon: 'fa-box',
					color: 'white',
					text: 'Base'
				});
			}
			if (resource['envType'] === 'object') {
				tags.push({
					icon: 'fa-save',
					color: 'white',
					text: 'Object'
				});
			}
		}
		return tags;
	}
	return [];
}

export function getResourceVisibilityTags(resource: IEaasiResource): ITag[] {
	let tagGroup = [];
	if(resource.resourceType !== resourceTypes.ENVIRONMENT) {
		if(!resource.isPublic) {
			tagGroup.push({
				icon: 'fa-cloud-download-alt',
				color: 'green',
				text: 'Private'
			});
		}
	}

	else if (resource.hasOwnProperty('archive')) {
		if (resource['archive'] === archiveTypes.REMOTE) {
			tagGroup.push({
				icon: 'fa-map-marker-alt',
				color: 'white',
				text: 'Remote'
			});
		} else if (resource['archive'] === archiveTypes.PUBLIC) {
			tagGroup.push({
				icon: 'fa-map-marker-alt',
				color: 'green',
				text: 'Saved'
			});
		} else if (resource['archive'] === archiveTypes.DEFAULT) {
			tagGroup.push({
				icon: 'fa-cloud-download-alt',
				color: 'green',
				text: 'Private'
			});
		}
	}
	return tagGroup;
}

export function filterResourcesByType(resources: IEaasiResource[], type: ResourceType) {
	if(!Array.isArray(resources)) return [];
	return resources.filter(x => x.resourceType === type);
}

export function removeResourcesByType(resources: IEaasiResource[], type: ResourceType) {
	if(!Array.isArray(resources)) return [];
	return resources.filter(x => x.resourceType !== type);
}

export function mapEnvironmentToEnvironmentUpdateRequest(environment: IEnvironment): IEnvironmentUpdateRequest {
    return {
        containerEmulatorName: environment.containerEmulatorName,
        containerEmulatorVersion: environment.containerEmulatorVersion,
        description: environment.description,
        drives: environment.drives.length > 0 ? _mapDrives(environment.drives) : [],
        enablePrinting: environment.enablePrinting,
        enableRelativeMouse: environment.enableRelativeMouse,
        envId: environment.envId,
        linuxRuntime: environment.isLinuxRuntime,
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