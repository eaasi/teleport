import { IEditableDrive } from '@/types/Resource';
import { generateId } from '@/utils/functions';

export default class EditableDrive implements IEditableDrive {
    uid: string = generateId();
    data: string = '';
    iface: string = '';
    filesystem: string = '';
    bus: string = '';
    unit: string = '';
    type: string = 'floppy';
    boot: boolean = false;
    plugged: boolean = false;
}