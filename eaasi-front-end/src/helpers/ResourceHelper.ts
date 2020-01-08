import { IDrive, IEnvironment } from '@/types/Resource';

export type IEnvironmentUpdateRequest = {
    containerEmulatorName: string;
    containerEmulatorVersion: string;
    description: string;
    drives: IDrive[];
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