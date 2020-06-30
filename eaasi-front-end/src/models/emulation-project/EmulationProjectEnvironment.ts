import { IDriveSetting, IEaasiResource } from '@/types/Resource';
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

    constructor() {
        this.drives = this.generateDefaultDrives();
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
