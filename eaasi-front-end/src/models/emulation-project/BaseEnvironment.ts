import { IDrive, IEaasiResource, IEditableDrive } from '@/types/Resource';
import { resourceTypes } from '@/utils/constants';
import { generateId } from '@/utils/functions';
import { IOsListItem } from '../admin/OperatingSystems';
import SoftwareImportResource from '../import/SoftwareImportResource';

export default class BaseEnvironment implements IEaasiResource {
	software: SoftwareImportResource = new SoftwareImportResource();
	type: number = 1;
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
    drives: IDrive[] = [];
    title: string = '';
    resourceType = resourceTypes.ENVIRONMENT;
    isPublic = false;

    constructor() {
        // Do we need to validate what drives could be populated based on the template selected for the environment?
        this.drives = this.generateDefaultDrives();
    }

    private generateDefaultDrives(): IEditableDrive[] {
        return [
            {
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
            {
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
            {
                uid: generateId(),
                data: '',
                iface: '',
                filesystem: '',
                bus: '',
                unit: '',
                type: 'cdrom',
                boot: false,
                plugged: false
            }
        ];
    }
}
