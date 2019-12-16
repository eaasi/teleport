import { IComponentInputMedium, IMachineComponentRequest } from '@/types/Eaas';
import { IEnvironment } from '@/types/Resource';

export default class MachineComponentRequest implements IMachineComponentRequest {
	userId?: string;
	input_data: IComponentInputMedium[];
    environment: string;
    keyboardLayout: string = 'us';
    keyboardModel: string = 'pc105';
    object?: string;
    archive: string = 'default';
    objectArchive?: string = 'default';
    software?: string;
    lockEnvironment: boolean = false;
	emulatorVersion?:string = 'latest';
	driveId?: string;
	readonly type = 'machine';

	constructor(env: IEnvironment = null) {
		if(!env) return;
		this.environment = env.envId;
		this.archive = env.archive;
	}
}