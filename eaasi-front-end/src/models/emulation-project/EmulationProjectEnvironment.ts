import { IDrive, IDriveSetting, IEaasiResource, IEnvironment, IInstalledSoftware } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { generateId } from '@/utils/functions';
import { IOsListItem } from '../admin/OperatingSystems';

export default class EmulationProjectEnvironment implements IEaasiResource {
	type: string;
	diskSize: string;
	nativeFMTs: IOsListItem[];
	label = '';
	size = 1024;
	cpus = '1';
	enablePrinting = false;
	enableRelativeMouse = false;
	virtualizeCpu = false;
	useWebRTC = false;
	useXpra = false;
	xpraEncoding = '';
	shutdownByOs = false;
    drives: IDriveSetting[] = [];
    title: string = '';
    resourceType = resourceTypes.ENVIRONMENT;
    isPublic = false;
    archive: string;
    installedSoftwareIds: IInstalledSoftware[] = [];
    emulator: string;
    os: string;
    envId: string;
    nativeConfig = '';

    constructor(environment: IEnvironment = null) {
    	console.log(environment);
        if (environment) {
            this.setEnvironmentProperties(environment);
        }
        this.drives = environment == null ? this.generateDefaultDrives() : this.mapDrives(environment.drives);
    }

    private setEnvironmentProperties(env: IEnvironment) {
        this.type = env.type;
        this.label = env.title;
        this.enablePrinting = env.enablePrinting;
        this.enableRelativeMouse = env.enableRelativeMouse;
        this.useWebRTC = env.useWebRTC;
        this.useXpra = env.useXpra;
        this.xpraEncoding = env.xpraEncoding;
        this.shutdownByOs = env.shutdownByOs;
        this.title = env.title;
        this.installedSoftwareIds = env.installedSoftwareIds;
        this.resourceType = env.resourceType;
        this.archive = env.archive;
        this.isPublic = env.isPublic;
        this.os = env.os;
        this.emulator = env.emulator;
        this.envId = env.envId;
        this.nativeConfig = env.nativeConfig;
    }

    private mapDrives(drives: IDrive[]): IDriveSetting[] {
        return drives.map((drive, index) => {
            return {
                drive: {
                    ...drive,
                    uid: generateId()
                },
                driveIndex: index
            };
        });
    }

    private generateDefaultDrives(): IDriveSetting[] {
        return [
            {
                drive: {
                    uid: generateId(),
                    data: '',
                    iface: '',
                    filesystem: '',
                    bus: '',
                    unit: '',
                    type: 'disk',
                    boot: true,
                    plugged: false
                },
                driveIndex: 1
            },
            {
                drive: {
                    uid: generateId(),
                    data: '',
                    iface: '',
                    filesystem: '',
                    bus: '',
                    unit: '',
                    type: 'floppy',
                    boot: false,
                    plugged: false
                },
                driveIndex: 2,
            },
            {
                drive: {
                    uid: generateId(),
                    data: '',
                    iface: '',
                    filesystem: '',
                    bus: '',
                    unit: '',
                    type: 'cdrom',
                    boot: false,
                    plugged: false
                },
                driveIndex: 3,
            }
        ];
    }
}